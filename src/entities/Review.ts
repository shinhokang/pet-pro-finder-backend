import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";

@Entity()
class Review extends Abstract {
  @Column({ type: "text" })
  text: string;

  @Column({ type: "real" })
  ratingForExpertise: number;

  @Column({ type: "real" })
  ratingForFriendliness: number;

  @ManyToOne(type => User, user => user.reviews, {
    onDelete: "CASCADE",
    eager: true
  })
  user: User;

  @ManyToOne(type => Trainer, trainer => trainer.reviews, {
    onDelete: "CASCADE"
  })
  trainer: Trainer;
}

export default Review;
