import { Column, Entity } from "typeorm";
import Abstract from "./Abstract";

@Entity()
class License extends Abstract {
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  organization: string | null;
}

export default License;
