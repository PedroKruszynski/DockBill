import {
  MigrationInterface, QueryRunner, Table, TableIndex, TableCheck,
} from 'typeorm';

export default class Users1633396094233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'birthDate',
            type: 'date',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createCheckConstraint('users', new TableCheck({
      columnNames: ['birthDate'],
      expression: '"birthDate" < now()',
    }));

    await queryRunner.createIndex('users', new TableIndex({
      name: 'INDEX_USER_EMAIL',
      columnNames: ['email'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'INDEX_USER_EMAIL');
    await queryRunner.dropTable('users');
  }
}
