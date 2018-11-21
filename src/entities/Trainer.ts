import { Column, Entity, OneToOne, OneToMany } from 'typeorm';
import Abstract from './Abstract';
import User from './User';
import TrainingProgram from './TrainingProgram';
import Comment from './Comment';
import Review from './Review';
import Favorite from './Favorite';
import License from './License';
import Experience from './Experience';
import WorkingArea from './WorkingArea';

@Entity()
class Trainer extends Abstract {
  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(type => License, license => license.trainer, {
    onDelete: 'CASCADE'
  })
  licenses: License[];

  @OneToMany(type => Experience, experience => experience.trainer, {
    onDelete: 'CASCADE'
  })
  experiences: Experience[];

  @Column({ type: 'simple-array', nullable: true })
  images: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  videos: string[] | null;

  @OneToMany(type => WorkingArea, workingArea => workingArea.trainer, {
    onDelete: 'CASCADE'
  })
  workingAreas: WorkingArea[];

  @OneToOne(type => User, user => user.trainer, {
    onDelete: 'CASCADE'
  })
  user: User;

  @OneToMany(
    type => TrainingProgram,
    trainingProgram => trainingProgram.trainer,
    {
      onDelete: 'CASCADE'
    }
  )
  trainingPrograms: TrainingProgram[];

  @OneToMany(type => Comment, comment => comment.trainer, {
    onDelete: 'CASCADE'
  })
  comments: Comment[];

  @OneToMany(type => Review, review => review.trainer, {
    onDelete: 'CASCADE'
  })
  reviews: Review[];

  @OneToMany(type => Favorite, favorite => favorite.trainer, {
    onDelete: 'CASCADE'
  })
  favorites: Favorite[];
}

export default Trainer;
