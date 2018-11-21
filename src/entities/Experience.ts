import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";

@Entity()
class Experience extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Trainer, trainer => trainer.experiences)
  trainer: Trainer;

  @Column({ type: "number" })
  trainerId: number;
}

export default Experience;
