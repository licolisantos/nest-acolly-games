import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria, {
    onDelete: 'CASCADE',
  })
  produtos: Produto[];
}
