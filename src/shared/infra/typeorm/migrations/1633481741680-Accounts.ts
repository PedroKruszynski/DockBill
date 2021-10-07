import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class Accounts1633481741680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'idUser',
            type: 'uuid',
          },
          {
            name: 'balance',
            type: 'money',
          },
          {
            name: 'withdrawalsDailyLimit',
            type: 'money',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'typeAccount',
            type: 'int',
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

    await queryRunner.createForeignKey('accounts', new TableForeignKey({
      columnNames: ['idUser'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('accounts') as Table;
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('idUser') !== -1) as TableForeignKey;
    await queryRunner.dropForeignKey('accounts', foreignKey);
    await queryRunner.dropColumn('accounts', 'idUser');
    await queryRunner.dropTable('accounts');
  }
}
