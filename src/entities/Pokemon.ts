import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ default: 0 })
  votes: number;

  @Column("text", { array: true, nullable: false }, )
  abilities: string[];

  @Column("text", { array: true, nullable: false  })
  types: string[];
}
