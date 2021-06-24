import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComplimentTable1624500708084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"compliments",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"user_sender",
                        type:"uuid"
                    },
                    {
                        name:"user_receiver",
                        type:"uuid"
                    },
                    {
                        name:"tag_id",
                        type:"uuid"
                    },
                    {
                        name:"message",
                        type:"varchar",
                        isNullable:true
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FK_user_sender_id",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_sender"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FK_user_receiver_id",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_receiver"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FK_tag_id",
                        referencedTableName:"tags",
                        referencedColumnNames:["id"],
                        columnNames:["tag_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments")
    }

}
