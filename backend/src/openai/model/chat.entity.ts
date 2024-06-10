import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Assistant } from './assistant.entity';
import { Message } from './message.entity';
import { User } from 'src/user/model/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assistant, assistant => assistant.chats)
  assistant: Assistant;

  @Column()
  thread: string;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  @ManyToOne(() => User)
  user: User;
}
