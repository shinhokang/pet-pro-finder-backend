import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";
import ProblemCategory from "./ProblemCategory";

@Entity()
class Review extends Abstract {
  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "real" })
  ratingForExpertise: number;

  @Column({ type: "real" })
  ratingForFriendliness: number;

  @ManyToOne(type => User, user => user.reviews)
  user: User;

  @Column({ type: "number" })
  userId: number;

  @ManyToOne(type => Trainer, trainer => trainer.reviews)
  trainer: Trainer;

  @Column({ type: "number" })
  trainerId: number;

  @ManyToMany(type => ProblemCategory)
  @JoinTable()
  problemCategories: ProblemCategory[];
}

export default Review;
