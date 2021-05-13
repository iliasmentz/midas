import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import {nanoid} from 'nanoid';
import EncryptionTransformer from '../../db/connection/encrypt';

@Entity('card')
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Index('idx_card_token', {unique: true})
  @Column('varchar', {length: 21})
  token: string = nanoid();

  @Column('text', {transformer: EncryptionTransformer})
  number: string;

  @Column()
  expirationMonth: number;

  @Column()
  expirationYear: number;

  @Column()
  cvc: number;

  @Column()
  invalidAt: Date;

  constructor(
    id: string,
    userId: string,
    number: string,
    expirationMonth: number,
    expirationYear: number,
    cvc: number,
    invalidAt: Date
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.number = number;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.cvc = cvc;
    this.invalidAt = invalidAt;
  }
}
