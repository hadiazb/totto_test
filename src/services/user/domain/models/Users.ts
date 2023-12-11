import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  id?: number;
  email?: string;
  identification?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  isFather?: boolean;
  isUpdate?: boolean;
  sex?: boolean;
  acceptTyC?: boolean;
  acceptTPD?: boolean;
}

export type UsersPk = 'id';
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes =
  | 'id'
  | 'email'
  | 'identification'
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'address'
  | 'birthday'
  | 'isFather'
  | 'isUpdate'
  | 'sex'
  | 'acceptTyC'
  | 'acceptTPD';
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users
  extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes
{
  id!: number;
  email!: string;
  identification?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  isFather?: boolean;
  isUpdate?: boolean;
  sex?: boolean;
  acceptTyC?: boolean;
  acceptTPD?: boolean;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true
        },
        isFather: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        isUpdate: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        acceptTyC: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        acceptTPD: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        sex: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true
        },
        birthday: {
          type: DataTypes.STRING,
          allowNull: true
        },
        identification: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Users',
        timestamps: true,
        paranoid: true,
        schema: 'public',
        indexes: [
          {
            name: 'Users_pkey',
            unique: true,
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
