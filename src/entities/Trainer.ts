import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import Abstract from "./Abstract";
import User from "./User";
import TrainingProgram from "./TrainingProgram";
import Comment from "./Comment";
import Review from "./Review";
import Favorite from "./Favorite";
import License from "./License";
import Experience from "./Experience";
import WorkingArea from "./WorkingArea";

@Entity()
class Trainer extends Abstract {
  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "simple-array", nullable: true })
  images: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  videos: string[] | null;

  @OneToMany(type => Experience, experience => experience.trainer)
  experiences: Experience[];

  @OneToOne(type => User, user => user.trainer)
  user: User;

  @Column()
  userId: number;

  @OneToMany(
    type => TrainingProgram,
    trainingProgram => trainingProgram.trainer
  )
  trainingPrograms: TrainingProgram[];

  @OneToMany(type => Comment, comment => comment.trainer)
  comments: Comment[];

  @OneToMany(type => Review, review => review.trainer)
  reviews: Review[];

  @OneToMany(type => Favorite, favorite => favorite.trainer)
  favorites: Favorite[];

  @ManyToMany(type => WorkingArea)
  @JoinTable()
  workingAreas: WorkingArea[];

  @ManyToMany(type => License)
  @JoinTable()
  licenses: License[];
}

export default Trainer;
