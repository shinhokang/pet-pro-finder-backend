import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";

@Entity()
class Experience extends Abstract {
  @Column({ type: "text" })
  text: string;

  @Column({ type: "text" })
  period: string;

  @ManyToOne(type => Trainer, trainer => trainer.experiences)
  trainer: Trainer;

  @Column({ type: "integer" })
  trainerId: number;
}

export default Experience;
