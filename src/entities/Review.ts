import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";

@Entity()
class Review extends Abstract {
  @Column({ type: "text" })
  text: string;

  @Column({ type: "decimal" })
  ratingForExpertise: number;

  @Column({ type: "decimal" })
  ratingForFriendliness: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.reviews, {
    onDelete: "CASCADE",
    eager: true
  })
  user: User;

  @Column({ nullable: true })
  trainerId: number;

  @ManyToOne(type => Trainer, trainer => trainer.reviews, {
    onDelete: "CASCADE"
  })
  trainer: Trainer;
}

export default Review;
