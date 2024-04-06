// src/courses/chapter.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, course => course.chapters)
  course: Course;

  @OneToMany(() => Lesson, lesson => lesson.chapter)
  lessons: Lesson[];

  @Column({ default: 0 })
  totalDurationMinutes: number;

  calculateTotalDuration(): void {
    if (this.lessons && this.lessons.length > 0) {
      this.totalDurationMinutes = this.lessons.reduce((total, lesson) => total + lesson.durationMinutes, 0);
    } else {
      this.totalDurationMinutes = 0;
    }
  }
}
