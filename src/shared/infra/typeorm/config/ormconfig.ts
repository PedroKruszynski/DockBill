import { ConnectionOptions } from 'typeorm';

require('dotenv').config();

const typeormConfig = {
  entities: [
    './src/modules/**/infra/typeorm/entities/*.ts',
  ],
  migrations: [
    './src/shared/infra/typeorm/migrations/*.ts',
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations/',
  },
};

if (process.env.ENV === 'production') {
  typeormConfig.entities = [
    './dist/modules/**/infra/typeorm/entities/*.js',
  ];
  typeormConfig.migrations = [
    './dist/shared/infra/typeorm/migrations/*.js',
  ];
  typeormConfig.cli = {
    migrationsDir: './dist/shared/infra/typeorm/migrations/*.js',
  };
}

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT ? +process.env.TYPEORM_PORT : 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ...typeormConfig,
};

export default connectionOptions;
