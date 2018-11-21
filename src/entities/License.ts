import { Column, Entity, ManyToOne } from 'typeorm';
import Abstract from './Abstract';
import Trainer from './Trainer';

@Entity()
class License extends Abstract {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(type => Trainer, trainer => trainer.licenses, {
    onDelete: 'CASCADE'
  })
  trainer: Trainer;
}

export default License;
