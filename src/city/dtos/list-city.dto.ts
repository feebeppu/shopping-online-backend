import { ListStateDTO } from 'src/state/dtos/list-state.dto';
import { CityEntity } from '../entities/city.entity';

export class ListCityDTO {
  cityName: string;
  stateName?: ListStateDTO;

  constructor(cityEntity: CityEntity) {
    this.cityName = cityEntity.cityName;
    this.stateName = cityEntity.state
      ? new ListStateDTO(cityEntity.state)
      : undefined;
  }
}
