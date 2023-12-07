import dotenv from 'dotenv';

dotenv.config();

const switchConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'develop':
      return {
        app: {
          host: process.env.HOST_DEVELOP
        },
        database: {
          dbName: process.env.DB_NAME_DEVELOP || '',
          dbUser: process.env.DB_USER_DEVELOP || '',
          dbPassword: process.env.DB_PASSWORD_DEVELOP || '',
          dbPort: process.env.DB_PORT_DEVELOP || '',
          dbHost: process.env.DB_HOST_DEVELOP || ''
        },
      };
    case 'production':
      return {
        app: {
          host: process.env.HOST_PRODUCTION
        },
        database: {
          dbName: process.env.DB_NAME_PRODUCTION || '',
          dbUser: process.env.DB_USER_PRODUCTION || '',
          dbPassword: process.env.DB_PASSWORD_PRODUCTION || '',
          dbPort: process.env.DB_PORT_PRODUCTION || '',
          dbHost: process.env.DB_HOST_PRODUCTION || ''
        }
      };

    case 'stg':
      return {
        app: {
          host: process.env.HOST_STG
        },
        database: {
          dbName: process.env.DB_NAME_STG || '',
          dbUser: process.env.DB_USER_STG || '',
          dbPassword: process.env.DB_PASSWORD_STG || '',
          dbPort: process.env.DB_PORT_STG || '',
          dbHost: process.env.DB_HOST_STG || ''
        }
      };

    default:
      return {
        app: {
          host: process.env.HOST_DEVELOP
        },
        database: {
          dbName: process.env.DB_NAME_DEVELOP || '',
          dbUser: process.env.DB_USER_DEVELOP || '',
          dbPassword: process.env.DB_PASSWORD_DEVELOP || '',
          dbPort: process.env.DB_PORT_DEVELOP || '',
          dbHost: process.env.DB_HOST_DEVELOP || ''
        }
      };
  }
};

export const config = {
  env: process.env.NODE_ENV || 'develop',
  path: '/api/v1',
  port: process.env.PORT || 8080,
  environment: switchConfig()
};
