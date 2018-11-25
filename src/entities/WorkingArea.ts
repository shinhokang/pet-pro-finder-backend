import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";

@Entity()
class WorkingArea extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(
    type => WorkingArea,
    workingArea => workingArea.childWorkingAreas,
    {
      nullable: true
    }
  )
  parentWorkingArea: WorkingArea;

  @Column({ nullable: true })
  parentWorkingAreaId: number | null;

  @OneToMany(
    type => WorkingArea,
    workingArea => workingArea.parentWorkingArea,
    {
      nullable: true
    }
  )
  childWorkingAreas: WorkingArea[];
}

export default WorkingArea;
