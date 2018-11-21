import { Column, Entity, OneToOne, OneToMany } from "typeorm";
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
  @Column({ type: "text", nullable: true })
  description: string;

  @OneToMany(type => License, license => license.trainer)
  licenses: License[];

  @OneToMany(type => Experience, experience => experience.trainer)
  experiences: Experience[];

  @Column({ type: "simple-array", nullable: true })
  images: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  videos: string[] | null;

  @OneToMany(type => WorkingArea, workingArea => workingArea.trainer)
  workingAreas: WorkingArea[];

  @OneToOne(type => User, user => user.trainer)
  user: User;

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
}

export default Trainer;
