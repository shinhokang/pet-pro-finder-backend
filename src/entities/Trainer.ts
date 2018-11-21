import { Column, Entity, OneToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import User from "./User";
import TrainingProgram from "./TrainingProgram";
import Comment from "./Comment";
import Review from "./Review";
import Favorite from "./Favorite";

@Entity()
class Trainer extends Abstract {
  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "simple-array", nullable: true })
  licenses: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  experiences: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  images: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  videos: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  workingAreas: string[] | null;

  @OneToOne(type => User, user => user.trainer, {
    onDelete: "CASCADE"
  })
  user: User;

  @OneToMany(
    type => TrainingProgram,
    trainingProgram => trainingProgram.trainer,
    {
      onDelete: "CASCADE"
    }
  )
  trainingPrograms: TrainingProgram[];

  @OneToMany(type => Comment, comment => comment.trainer, {
    onDelete: "CASCADE"
  })
  comments: Comment[];

  @OneToMany(type => Review, review => review.trainer, {
    onDelete: "CASCADE"
  })
  reviews: Review[];

  @OneToMany(type => Favorite, favorite => favorite.trainer, {
    onDelete: "CASCADE"
  })
  favorites: Favorite[];
}

export default Trainer;
