import type { Sequelize } from 'sequelize';
import { Users as _Users } from '../services/user/domain/models/Users';
import { City as _City } from '../services/state/domain/models/City';
import { State as _State } from '../services/state/domain/models/State';
import type {
  UsersAttributes,
  UsersCreationAttributes
} from '../services/user/domain/models/Users';
import type { CityAttributes, CityCreationAttributes } from '../services/state/domain/models/City';
import type {
  StateAttributes,
  StateCreationAttributes
} from '../services/state/domain/models/State';
export { _Users as Users };
export { _City as City };
export { _State as State };
export type { UsersAttributes, UsersCreationAttributes };
export type { CityAttributes, CityCreationAttributes };
export type { StateAttributes, StateCreationAttributes };

export function initModels(sequelize: Sequelize) {
  const Users = _Users.initModel(sequelize);
  const City = _City.initModel(sequelize);
  const State = _State.initModel(sequelize);

  State.hasMany(City, { as: 'City', foreignKey: 'idState' });

  return {
    Users,
    City,
    State
  };
}
