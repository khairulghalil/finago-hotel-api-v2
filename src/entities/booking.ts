import { Column, Entity } from "typeorm";

@Entity("bookingTbl", { schema: "finago_hotel" })
export class BookingTbl {
  @Column("varchar", { primary: true, name: "id", length: 8 })
  id!: string;

  @Column("varchar", { name: "roomId", length: 8 })
  roomId!: string;

  @Column("varchar", { name: "customerId", length: 8 })
  customerId!: string;

  @Column("json", { name: "addOns" })
  addOns!: object;

  @Column("date", { name: "checkInDate" })
  checkInDate!: string;

  @Column("date", { name: "checkOutDate" })
  checkOutDate!: string;

  @Column("float", { name: "totalPrice", precision: 12 })
  totalPrice!: number;

  @Column("tinyint", { name: "isCancelled" })
  isCancelled!: number;
}
