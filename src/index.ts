import { PoolConnection, escape, FieldInfo } from 'mysql';

export interface IQueryOptions {
  parameters: object;
}

export class MySqlQuery {
  private dbconn: PoolConnection;

  public parameters: { [index: string]: any } = {};
  public qString: string;

  constructor(qString: string, connection: PoolConnection, options?: Partial<IQueryOptions>) {
    this.qString = qString;
    this.dbconn = connection;

    if (options) {
      if (options.parameters) this.parameters = options.parameters;
    }
  }

  private query() {
    return new Promise<{ results: any, fields: FieldInfo[] | undefined }>((resolve, reject) => {

      this.dbconn.query(this.qString, this.parameters, (err, results, fields) => {
        if (err) return reject(err);
        return resolve({ results, fields });
      });

    });
  }

  public executeNonQuery() {
    return new Promise<any>((resolve, reject) => {
      this.query().then(q => {
        return resolve(q.results);
      }).catch(err => {
        return reject(err);
      })
    });
  }

  public executeQuery() {
    return this.query();
  }

  public executeScalar<T>() {
    return new Promise<T>((resolve, reject) => {
      this.query().then(q => {
        const scalarObj = Object.assign({}, q.results[0]);
        if (!scalarObj) {
          throw new Error('Unable to determine a scalar result to output');
        } else {
          const output = scalarObj[Object.keys(scalarObj)[0]];
          return resolve(output);
        }
      }).catch(err => reject(err));
    });
  }
}