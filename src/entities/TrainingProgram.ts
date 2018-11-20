import { Column, Entity, ManyToOne } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";

@Entity()
class TrainingProgram extends Abstract {
  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "integer", nullable: true })
  price: number | null;

  @Column({ type: "simple-array", nullable: true })
  problemCategories: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  images: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  videos: string[] | null;

  @ManyToOne(type => Trainer, trainer => trainer.trainingPrograms, {
    onDelete: "CASCADE"
  })
  trainer: Trainer;
}

export default TrainingProgram;
