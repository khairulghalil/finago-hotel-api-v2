import { Column, Entity } from "typeorm";

@Entity("roomTbl", { schema: "finago_hotel" })
export class RoomTbl {
  @Column("varchar", { primary: true, name: "id", length: 8 })
  id!: string;

  @Column("varchar", { name: "roomCategoryId", length: 8 })
  roomCategoryId!: string;

  @Column("varchar", { name: "img", length: 50 })
  img!: string;

  @Column("varchar", { name: "description", length: 100 })
  description!: string;

  @Column("int", { name: "size" })
  size!: number;

  @Column("varchar", { name: "bedType", length: 50 })
  bedType!: string;

  @Column("varchar", { name: "roomNumber", length: 10 })
  roomNumber!: string;

  @Column("float", { name: "price", precision: 12 })
  price!: number;

  @Column("varchar", { name: "roomStatusId", length: 8 })
  roomStatusId!: string;
}
