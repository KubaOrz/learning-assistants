import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';

export type AuthorType = 'USER' | 'ASSISTANT';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  timestamp: Date;

  @Column({
    type: 'enum',
    enum: ['USER', 'ASSISTANT'],
  })
  author: AuthorType;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;
}
