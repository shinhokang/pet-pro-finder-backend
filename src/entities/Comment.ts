import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import User from "./User";

@Entity()
class Comment extends Abstract {
  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Comment, comment => comment.childComments, {
    nullable: true,
    onDelete: "CASCADE"
  })
  parentComment: Comment;

  @OneToMany(type => Comment, comment => comment.parentComment, {
    nullable: true
  })
  childComments: Comment[];

  @ManyToOne(type => User, user => user.comments, {
    onDelete: "CASCADE",
    eager: true
  })
  user: User;

  @ManyToOne(type => Trainer, trainer => trainer.comments, {
    onDelete: "CASCADE"
  })
  trainer: Trainer;
}

export default Comment;
