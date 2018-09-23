import * as mysql from 'mysql';

export class DatabaseService {
    private static host: string = 'localhost';
    private static user: string = 'root';
    private static password: string = 'root';
    private static database: string = 'smartup_table';

    private static conn(): any {
        const conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
        conn.connect();

        return conn;
    }

    public static exec<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.conn().query(query, (e, res, fields) => {
                if (e) reject(e);
                this.conn().end();
                resolve(res);
            });
        });
    }
}