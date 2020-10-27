"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MySqlQuery {
    constructor(qString, connection, options) {
        this.parameters = {};
        this.qString = qString;
        this.dbconn = connection;
        if (options) {
            if (options.parameters)
                this.parameters = options.parameters;
            if (options.queryFormat)
                this.queryFormat = options.queryFormat;
        }
    }
    query() {
        return new Promise((resolve, reject) => {
            if (this.queryFormat !== undefined) {
                this.dbconn.query(this.queryFormat(this.qString, this.parameters), (err, results, fields) => {
                    if (err)
                        return reject(err);
                    return resolve({ results, fields });
                });
            }
            else {
                this.dbconn.query(this.qString, this.parameters, (err, results, fields) => {
                    if (err)
                        return reject(err);
                    return resolve({ results, fields });
                });
            }
        });
    }
    executeNonQuery() {
        return new Promise((resolve, reject) => {
            this.query().then(q => {
                return resolve(q.results);
            }).catch(err => {
                return reject(err);
            });
        });
    }
    executeQuery() {
        return this.query();
    }
    executeScalar() {
        return new Promise((resolve, reject) => {
            this.query().then(q => {
                const scalarObj = Object.assign({}, q.results[0]);
                if (!scalarObj) {
                    throw new Error('Unable to determine a scalar result to output');
                }
                else {
                    const output = scalarObj[Object.keys(scalarObj)[0]];
                    return resolve(output);
                }
            }).catch(err => reject(err));
        });
    }
}
exports.MySqlQuery = MySqlQuery;
//# sourceMappingURL=index.js.map