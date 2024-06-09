import { Course } from 'src/course/model/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Assistant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openaiId: string;

  @Column()
  name: string

  @Column()
  enabled: boolean;

  @OneToOne(() => Course)
  @JoinColumn()
  course: Course;

  @OneToMany(() => Chat, chat => chat.assistant)
  chats: Chat[];
}
