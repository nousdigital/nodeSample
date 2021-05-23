import { ObjectId } from 'bson';
import logger from '../util/logger';
import { VersionedEntity } from '../database/versioned.entity';

/**
 * Versioned model for internal use
 */
export abstract class VersionedModel<E extends VersionedEntity> {

  protected constructor(
    public id: string,
    public tenantId: string,
    public version?: number,
    public createdOn?: Date,
    public createdBy?: string,
    public lastModified?: Date,
    public modifiedBy?: string
  ) {
  }

    protected abstract mapModelSpecifics(): E;

    protected mapId(id: string): ObjectId {
        try {
            const objId = new ObjectId(id);
            return objId;
        } catch(e) {
            logger.warn(`fail to map ID [${id}] with error: ${e}`);
        }

        return undefined;
    }

  public toEntity(): E {
      const entity = this.mapModelSpecifics();

      if(this.id) {
          entity['_id'] = entity['id'] = this.mapId(this.id);
      }

    entity['version'] = this.version;
    entity['createdOn'] = this.createdOn;
    entity['createdBy'] = this.createdBy;
    entity['lastModified'] = this.lastModified;
    entity['modifiedBy'] = this.modifiedBy;

    return entity;
  }
}
