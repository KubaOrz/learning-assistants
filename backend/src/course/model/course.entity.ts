import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Chapter } from './chapter.entity';
import { User } from 'src/user/model/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  shortDescription: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => User)
  author: User

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'text' })
  longDescription: string;

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters: Chapter[];

  @Column({ default: 0 })
  totalDurationMinutes: number;
}
