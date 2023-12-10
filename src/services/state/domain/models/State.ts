import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { City, CityId } from './City';

export interface StateAttributes {
  id: number;
  stateName?: string;
}

export type StatePk = 'id';
export type StateId = State[StatePk];
export type StateOptionalAttributes = 'id' | 'stateName';
export type StateCreationAttributes = Optional<StateAttributes, StateOptionalAttributes>;

export class State
  extends Model<StateAttributes, StateCreationAttributes>
  implements StateAttributes
{
  id!: number;
  stateName?: string;

  // City hasMany
  Cities!: City[];
  getCity!: Sequelize.HasManyGetAssociationsMixin<City>;
  setCity!: Sequelize.HasManySetAssociationsMixin<City, CityId>;
  addCity!: Sequelize.HasManyAddAssociationMixin<City, CityId>;
  addCities!: Sequelize.HasManyAddAssociationsMixin<City, CityId>;
  createCities!: Sequelize.HasManyCreateAssociationMixin<City>;
  removeCity!: Sequelize.HasManyRemoveAssociationMixin<City, CityId>;
  removeCities!: Sequelize.HasManyRemoveAssociationsMixin<City, CityId>;
  hasCity!: Sequelize.HasManyRemoveAssociationMixin<City, CityId>;
  hasCities!: Sequelize.HasManyRemoveAssociationsMixin<City, CityId>;
  countCities!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof State {
    return State.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        stateName: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'States',
        timestamps: true,
        paranoid: true,
        schema: 'public',
        indexes: [
          {
            name: 'States_pkey',
            unique: true,
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
