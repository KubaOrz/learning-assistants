import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  durationMinutes: number;

  @Column()
  videoUrl: string;

  @Column()
  content: string;
  // TODO add graphics

  @Column()
  lessonNumber: number;

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons)
  chapter: Chapter;
}
