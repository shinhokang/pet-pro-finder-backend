import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";

@Entity()
class TrainingProgram extends Abstract {
  @Column({ nullable: true })
  trainerId: number;

  @ManyToOne(type => Trainer, trainer => trainer.trainingPrograms, {
    onDelete: "CASCADE"
  })
  trainer: Trainer;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @Column({ type: "text", nullable: true })
  images: string[] | null;

  @Column({ type: "text", nullable: true })
  videos: string[] | null;
}

export default TrainingProgram;
