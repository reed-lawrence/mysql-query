import { PoolConnection, FieldInfo } from 'mysql';
export interface IQueryOptions {
    parameters: object;
    queryFormat: (query: string, values: any) => string;
}
export declare class MySqlQuery {
    private dbconn;
    parameters: {
        [index: string]: any;
    };
    qString: string;
    queryFormat?: (query: string, values: any) => string;
    constructor(qString: string, connection: PoolConnection, options?: Partial<IQueryOptions>);
    private query;
    executeNonQuery(): Promise<any>;
    executeQuery(): Promise<{
        results: any;
        fields: FieldInfo[] | undefined;
    }>;
    executeScalar<T>(): Promise<T>;
}
//# sourceMappingURL=index.d.ts.map