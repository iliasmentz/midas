import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity('sale')
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Index('idx_sale_token', {unique: true})
  @Column('varchar', {length: 21})
  token: string;

  @Column()
  amount: number;

  @Column()
  processor: string;

  @Column()
  currency: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  email?: string;

  @Column()
  externalId: string;

  @Column()
  status: string;

  @Column()
  executedAt: Date;

  constructor(
    id: string,
    userId: string,
    token: string,
    amount: number,
    processor: string,
    currency: string,
    description: string,
    email: string,
    externalId: string,
    status: string,
    executedAt: Date
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.amount = amount;
    this.processor = processor;
    this.currency = currency;
    this.description = description;
    this.email = email;
    this.externalId = externalId;
    this.status = status;
    this.executedAt = executedAt;
  }
}
