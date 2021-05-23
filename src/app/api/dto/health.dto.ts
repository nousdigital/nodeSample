/**
 * @swagger
 * components:
 *  schemas:
 *    HealthDto:
 *      properties:
 *        version:
 *          type: string
 *        msg:
 *          type: string
 *          description: 'a human readable health message'
 */
export class HealthDto {
  constructor(
    public msg: string,
    public version: string
  ) {
  }

  public toJSON() {
    return {
      msg: this.msg,
      version: this.version
    };
  }
}
