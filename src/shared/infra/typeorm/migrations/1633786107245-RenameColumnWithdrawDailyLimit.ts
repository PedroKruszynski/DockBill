import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RenameColumnWithdrawDailyLimit1633786107245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'accounts',
      'withdrawalsDailyLimit',
      'withdrawDailyLimit',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'accounts',
      'withdrawDailyLimit',
      'withdrawalsDailyLimit',
    );
  }
}
