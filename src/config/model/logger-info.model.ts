export interface LoggerInfoModel {
  /**
   * defines the log level
   */
  level: string;

  /**
   * defines the log target directory - have to be set if persist == true
   */
  directory?: string;

  /**
   * defines if logs should be saved in a file
   */
  persist: boolean;
}
