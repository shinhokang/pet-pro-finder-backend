import { IsEmail } from "class-validator";
import { Column, Entity, OneToOne, OneToMany } from "typeorm";
import Abstract from "./Abstract";
import Trainer from "./Trainer";
import Comment from "./Comment";
import Review from "./Review";
import Favorite from "./Favorite";

@Entity()
class User extends Abstract {
  @Column({ type: "text", unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ type: "text", nullable: true })
  name: string | null;

  @Column({ type: "text", nullable: true })
  password: string | null;

  @Column({ type: "text", nullable: true })
  naverId: string | null;

  @Column({ type: "text", nullable: true })
  kakaoId: string | null;

  @Column({ type: "text", nullable: true })
  fbId: string | null;

  @Column({ type: "text", nullable: true })
  googleId: string | null;

  @Column({ type: "text", nullable: true })
  phoneNumber: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "text", nullable: true })
  profileImage: string | null;

  @OneToOne(type => Trainer, trainer => trainer.user, {
    onDelete: "CASCADE"
  })
  trainer: Trainer | null;

  @OneToMany(type => Comment, comment => comment.user, { onDelete: "CASCADE" })
  comments: Comment[];

  @OneToMany(type => Review, review => review.user, {
    onDelete: "CASCADE"
  })
  reviews: Review[];

  @OneToMany(type => Favorite, favorite => favorite.user, {
    onDelete: "CASCADE"
  })
  favorites: Favorite[];

  get isTrainer(): boolean {
    return this.trainer ? true : false;
  }

  get profilePhoto(): string {
    if (this.fbId) {
      return `https://graph.facebook.com/${this.fbId}/picture?type=square`;
    }
    return this.profileImage ? this.profileImage : "";
  }
}

export default User;
