import { Column, Entity } from "typeorm";

@Entity("customerTbl", { schema: "finago_hotel" })
export class CustomerTbl {
  @Column("varchar", { primary: true, name: "id", length: 8 })
  id!: string;

  @Column("varchar", { name: "name", length: 50 })
  name!: string;

  @Column("varchar", { name: "email", nullable: true, length: 50 })
  email!: string | null;

  @Column("varchar", { name: "icNumber", length: 100 })
  icNumber!: string;

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone!: string | null;
}
