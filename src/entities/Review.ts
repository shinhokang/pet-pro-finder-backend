import { Column, Entity, ManyToOne, ManyToMany } from 'typeorm';
import Abstract from './Abstract';
import Trainer from './Trainer';
import User from './User';
import ProblemCategory from './ProblemCategory';

@Entity()
class Review extends Abstract {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'real' })
  ratingForExpertise: number;

  @Column({ type: 'real' })
  ratingForFriendliness: number;

  @ManyToOne(type => User, user => user.reviews, {
    onDelete: 'CASCADE',
    eager: true
  })
  user: User;

  @ManyToOne(type => Trainer, trainer => trainer.reviews, {
    onDelete: 'CASCADE'
  })
  trainer: Trainer;

  @ManyToMany(type => ProblemCategory)
  @JoinTable()
  problemCategories: ProblemCategory[];
}

export default Review;
