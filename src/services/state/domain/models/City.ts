import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CityAttributes {
  id: number;
  cityName?: string;
  idState?: number;
}

export type CityPk = 'id';
export type CityId = City[CityPk];
export type CityOptionalAttributes = 'id' | 'cityName';
export type CityCreationAttributes = Optional<CityAttributes, CityOptionalAttributes>;

export class City extends Model<CityAttributes, CityCreationAttributes> {
  id!: number;
  cityName?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof City {
    return City.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        cityName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        idState: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'City',
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            name: 'City_pkey',
            unique: true,
            fields: [
              {
                name: 'id'
              }
            ]
          }
        ]
      }
    );
  }
}
