import { Column, Entity } from "typeorm";

@Entity("roomStatusTbl", { schema: "finago_hotel" })
export class RoomStatusTbl {
  @Column("varchar", { primary: true, name: "id", length: 8 })
  id!: string;

  @Column("varchar", { name: "name", length: 20 })
  name!: string;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description!: string | null;
}
