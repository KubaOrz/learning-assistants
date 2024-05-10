// src/courses/chapter.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, (course) => course.chapters)
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.chapter)
  lessons: Lesson[];

  @Column({ default: 0 })
  totalDurationMinutes: number;  
}
