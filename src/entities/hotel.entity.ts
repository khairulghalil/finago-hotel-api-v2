import { Entity, Column } from 'typeorm';

@Entity('hotels')
export class Hotel {
  @Column('varchar', { primary: true, name: 'id', length: 36 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 500 })
  address!: string;

  @Column({ type: 'varchar', length: 100 })
  city!: string;

  @Column({ type: 'varchar', length: 100 })
  country!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'int', default: 0 })
  rating!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;
}
