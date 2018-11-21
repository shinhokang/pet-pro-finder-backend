import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";

@Entity()
class WorkingArea extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Trainer, trainer => trainer.workingAreas)
  trainer: Trainer;

  @Column({ type: "number" })
  trainerId: number;
}

export default WorkingArea;
