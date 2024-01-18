import { StateEntity } from '../entities/state.entity';

export class ListStateDTO {
  stateName: string;

  constructor(stateEntity: StateEntity) {
    this.stateName = stateEntity.stateName;
  }
}
