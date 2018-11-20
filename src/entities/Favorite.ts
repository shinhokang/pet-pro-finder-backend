import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";

@Entity()
class Favorite extends Abstract {
  @Column({ type: "boolean" })
  marked: boolean;

  @ManyToOne(type => User, user => user.favorites, {
    onDelete: "CASCADE",
    eager: true
  })
  user: User;

  @ManyToOne(type => Trainer, trainer => trainer.favorites, {
    onDelete: "CASCADE"
  })
  trainer: Trainer;
}

export default Favorite;
