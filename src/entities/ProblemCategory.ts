import { Column, Entity } from "typeorm";
import Abstract from "./Abstract";

@Entity()
class ProblemCategory extends Abstract {
  @Column({ type: "text" })
  name: string;
}

export default ProblemCategory;
