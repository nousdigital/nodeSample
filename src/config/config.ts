import { ConfigModel } from './model/config.model';


export const config: ConfigModel = {
  api: {
    name: "NOUS Sample Project",
    port: 6565,
    buildNumber: "0.0.1"
  },

  mode: "dev",
  basePath: "/sample",

  database: {
    name: "nous_data",
    authenticationDatabase: "nous_data",
    host: "localhost",
    port: 27017,
    username: undefined,
    password: undefined
  },

  logger: {
    level: "debug",
    persist: true,
    directory: "./"
  }

};
