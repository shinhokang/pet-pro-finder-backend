import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";

@Entity()
class Favorite extends Abstract {
  @Column({ type: "boolean" })
  marked: boolean;

  @ManyToOne(type => User, user => user.favorites)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(type => Trainer, trainer => trainer.favorites)
  trainer: Trainer;

  @Column()
  trainerId: number;
}

export default Favorite;
