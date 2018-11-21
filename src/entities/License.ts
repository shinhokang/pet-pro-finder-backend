import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";

@Entity()
class License extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Trainer, trainer => trainer.licenses)
  trainer: Trainer;

  @Column({ type: "number" })
  trainerId: number;
}

export default License;
