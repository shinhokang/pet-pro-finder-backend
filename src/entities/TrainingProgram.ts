import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import ProblemCategory from "./ProblemCategory";

@Entity()
class TrainingProgram extends Abstract {
  @Column({ type: "text", nullable: true })
  title: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "integer", nullable: true })
  price: number | null;

  @Column({ type: "simple-array", nullable: true })
  images: string[] | null;

  @Column({ type: "simple-array", nullable: true })
  videos: string[] | null;

  @ManyToOne(type => Trainer, trainer => trainer.trainingPrograms)
  trainer: Trainer;

  @Column({ type: "number" })
  trainerId: number;

  @ManyToMany(type => ProblemCategory)
  @JoinTable()
  problemCategories: ProblemCategory[];
}

export default TrainingProgram;
