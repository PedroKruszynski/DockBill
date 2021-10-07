import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class Transactions1633639072317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'idAccount',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'money',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      columnNames: ['idAccount'],
      referencedColumnNames: ['id'],
      referencedTableName: 'accounts',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transactions') as Table;
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('idAccount') !== -1) as TableForeignKey;
    await queryRunner.dropForeignKey('transactions', foreignKey);
    await queryRunner.dropColumn('transactions', 'idAccount');
    await queryRunner.dropTable('transactions');
  }
}
