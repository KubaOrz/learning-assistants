import { Course } from 'src/course/model/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

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
}
