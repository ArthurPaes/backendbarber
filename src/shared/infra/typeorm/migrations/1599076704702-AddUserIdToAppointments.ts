import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1599076704702
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'], // qual a coluna que vai receber a chave estrangeira no caso é o provider id que vai receber o id do do usuario
        referencedColumnNames: ['id'], // qual que é o nome da coluna na table de usuario que vai representar o user id  = é o id do usuairo
        referencedTableName: 'users', // qual é o nome da tabela que vai fazer referência a essa coluna (é o id na coluna de users que vai fazer referencia a coluna de user id nos appointments)
        onDelete: 'SET NULL', // o que vai acontecer com os agendamentos de usuario caso esse user seja deletado
        onUpdate: 'CASCADE', // caso essse user tenha o id alterado o que deve acontecer
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
