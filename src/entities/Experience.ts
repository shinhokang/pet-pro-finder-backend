import { Column, Entity, ManyToOne } from 'typeorm';
import Abstract from './Abstract';
import Trainer from './Trainer';

@Entity()
class Experience extends Abstract {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(type => Trainer, trainer => trainer.experiences, {
    onDelete: 'CASCADE'
  })
  trainer: Trainer;
}

export default Experience;
