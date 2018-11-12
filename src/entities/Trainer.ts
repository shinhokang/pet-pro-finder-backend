import { Column, Entity, OneToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import User from "./User";
import TrainingProgram from "./TrainingProgram";
import Comment from "./Comment";
import Review from "./Review";
import Favorite from "./Favorite";

@Entity()
class Trainer extends Abstract {
  @Column({ nullable: true })
  userId: number;

  @OneToOne(type => User, user => user.trainer, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  licenses: string[] | null;

  @Column({ type: "text", nullable: true })
  experiences: string[] | null;

  @Column({ type: "text", nullable: true })
  images: string[] | null;

  @Column({ type: "text", nullable: true })
  videos: string[] | null;

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
