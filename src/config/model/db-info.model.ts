export interface DBInfoModel {
    /**
     * The name of the database
     */
    name: string;

    /**
     * The name of the authorization database. If no authentication is activated, same as name.
     */
    authenticationDatabase: string;

    /**
     * The host of the database, typically localhost
     */
    host: string;

    /**
     * The port of the database
     */
    port: number;

    /**
     * The DB username
     */
    username?: string;

    /**
     * The DB password
     */
    password?: string;

}
