// src/courses/course.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => User, { lazy: true })
  author: Promise<User>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'text' })
  longDescription: string;

  @OneToMany(() => Chapter, chapter => chapter.course, { lazy: true })
  chapters: Promise<Chapter[]>;

  async calculateTotalDuration(): Promise<number> {
    let totalDuration = 0;
    const chapters = await this.chapters;
    chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        totalDuration += lesson.durationMinutes;
      });
    });
    return totalDuration;
  }

  // Getter zwracający łączny czas trwania
  async totalDurationMinutes(): Promise<number> {
    return this.calculateTotalDuration();
  }
}
