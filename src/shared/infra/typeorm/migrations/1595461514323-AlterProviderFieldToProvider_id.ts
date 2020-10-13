import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { query } from 'express';

export default class AlterProviderFieldToProviderId1595461514323
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], // qual a coluna que vai receber a chave estrangeira no caso é o provider id que vai receber o id do do usuario
        referencedColumnNames: ['id'], // qual que é o nome da coluna na table de usuario que vai representar o provider id  = é o id do usuairo
        referencedTableName: 'users', // qual é o nome da tabela que vai fazer referência a essa coluna (é o id na coluna de users que vai fazer referencia a coluna de provider id nos appointments)
        onDelete: 'SET NULL', // o que vai acontecer com os agendamentos de usuario caso esse user seja deletado
        onUpdate: 'CASCADE', // caso essse user tenha o id alterado o que deve acontecer
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
