import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";

@Entity()
class Comment extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Comment, comment => comment.childComments, {
    nullable: true
  })
  parentComment: Comment;

  @Column({ type: "number" })
  parentCommentId: number;

  @OneToMany(type => Comment, comment => comment.parentComment, {
    nullable: true
  })
  childComments: Comment[];

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @Column({ type: "number" })
  userId: number;

  @ManyToOne(type => Trainer, trainer => trainer.comments)
  trainer: Trainer;

  @Column({ type: "number" })
  trainerId: number;
}

export default Comment;
