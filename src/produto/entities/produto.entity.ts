import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  estoque: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'int', nullable: false })
  categoria_id: number;
}
