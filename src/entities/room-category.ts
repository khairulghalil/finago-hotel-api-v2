import { Column, Entity } from 'typeorm';

@Entity('roomCategoryTbl', { schema: 'finago_hotel' })
export class RoomCategoryTbl {
  @Column('varchar', { primary: true, name: 'id', length: 8 })
  id!: string;

  @Column('varchar', { name: 'name', length: 50 })
  name!: string;

  @Column('int', { name: 'orderIndex' })
  orderIndex!: number;
}
