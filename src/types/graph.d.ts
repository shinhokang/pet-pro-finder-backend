export const typeDefs = ["type CreateCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype Mutation {\n  CreateComment(text: String!, trainerId: Int!, commentId: Int): CreateCommentResponse!\n  DeleteComment(commentId: Int!): DeleteCommentResponse!\n  EditComment(commentId: Int!, text: String!): EditCommentResponse!\n  ToggleFavorite(trainerId: Int!): ToggleFavoriteResponse!\n  CreateReview(text: String!, ratingForExpertise: Float!, ratingForFriendliness: Float!, trainerId: Int!): CreateReviewResponse!\n  DeleteReview(reviewId: Int!): DeleteReviewResponse!\n  EditReview(reviewId: Int!, text: String!, ratingForExpertise: Int!, ratingForFriendliness: Int!): EditReviewResponse!\n  CreateTrainer(userId: Int!, description: String!, licenses: [String], experiences: [String], images: [String], videos: [String]): CreateTrainerResponse!\n  EditTrainer(trainerId: Int!, description: String!, licenses: [String], experiences: [String], images: [String], videos: [String]): EditTrainerResponse!\n  CreateTrainingProgram(trainerId: Int!, description: String!, price: Int!, images: [String], videos: [String]): CreateTrainingProgramResponse!\n  DeleteTrainingProgram(trainingProgramId: Int!): DeleteTrainingProgramResponse!\n  EditTrainingProgram(trainingProgramId: Int!, description: String, price: Int, images: [String], videos: [String]): EditTrainingProgramResponse!\n  ConnectFB(firstName: String!, lastName: String!, email: String, fbId: String!): ConnectFBResponse!\n  ConnectGoogle(firstName: String!, lastName: String!, email: String, googleId: String!): ConnectGoogleResponse!\n  ConnectKakao(firstName: String!, lastName: String!, email: String, kakaoId: String!): ConnectKakaoResponse!\n  ConnectNaver(firstName: String!, lastName: String!, email: String, naverId: String!): ConnectNaverResponse!\n  EditUser(username: String, phoneNumber: String, profileDescription: String): EditUserResponse!\n}\n\ntype DeleteCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Comment {\n  id: Int!\n  text: String!\n  userId: Int\n  user: User!\n  trainerId: Int\n  trainer: Trainer!\n  parentComment: Comment\n  childComments: [Comment]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Favorite {\n  id: Int!\n  userId: Int\n  user: User!\n  trainerId: Int\n  trainer: Trainer!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype ToggleFavoriteResponse {\n  ok: Boolean!\n  error: String\n  add: Boolean!\n}\n\ntype CreateReviewResponse {\n  ok: Boolean!\n  error: String\n  review: Review\n}\n\ntype DeleteReviewResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditReviewResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Review {\n  id: Int!\n  text: String!\n  ratingForExpertise: Float!\n  ratingForFriendliness: Float!\n  userId: Int\n  user: User!\n  trainerId: Int\n  trainer: Trainer!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTrainerResponse {\n  ok: Boolean!\n  error: String\n  trainer: Trainer\n}\n\ntype EditTrainerResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllTrainersResponse {\n  ok: Boolean!\n  error: String\n  trainers: [Trainer]\n}\n\ntype Query {\n  GetAllTrainers: GetAllTrainersResponse!\n  CheckUsername(username: String!): CheckUsernameResponse!\n  Me: MeResponse!\n}\n\ntype Trainer {\n  id: Int!\n  userId: Int\n  user: User!\n  description: String!\n  licenses: [String]\n  experiences: [String]\n  images: [String]\n  videos: [String]\n  trainingPrograms: [TrainingProgram]\n  comments: [Comment]\n  reviews: [Review]\n  favorites: [Favorite]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTrainingProgramResponse {\n  ok: Boolean!\n  error: String\n  trainingProgram: TrainingProgram\n}\n\ntype DeleteTrainingProgramResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditTrainingProgramResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype TrainingProgram {\n  id: Int!\n  trainerId: Int\n  trainer: Trainer!\n  description: String\n  price: Int\n  images: [String]\n  videos: [String]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CheckUsernameResponse {\n  ok: Boolean!\n  available: Boolean\n  error: String\n}\n\ntype ConnectFBResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  isNew: Boolean!\n}\n\ntype ConnectGoogleResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  isNew: Boolean!\n}\n\ntype ConnectKakaoResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  isNew: Boolean!\n}\n\ntype ConnectNaverResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  isNew: Boolean!\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype MeResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  email: String\n  username: String!\n  firstName: String!\n  lastName: String!\n  naverId: String\n  kakaoId: String\n  fbId: String\n  googleId: String\n  phoneNumber: String\n  profileDescription: String\n  trainer: Trainer\n  comments: [Comment]\n  reviews: [Review]\n  favorites: [Favorite]\n  fullName: String!\n  isTrainer: Boolean!\n  profilePhoto: String!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetAllTrainers: GetAllTrainersResponse;
  CheckUsername: CheckUsernameResponse;
  Me: MeResponse;
}

export interface CheckUsernameQueryArgs {
  username: string;
}

export interface GetAllTrainersResponse {
  ok: boolean;
  error: string | null;
  trainers: Array<Trainer> | null;
}

export interface Trainer {
  id: number;
  userId: number | null;
  user: User;
  description: string;
  licenses: Array<string> | null;
  experiences: Array<string> | null;
  images: Array<string> | null;
  videos: Array<string> | null;
  trainingPrograms: Array<TrainingProgram> | null;
  comments: Array<Comment> | null;
  reviews: Array<Review> | null;
  favorites: Array<Favorite> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  username: string;
  firstName: string;
  lastName: string;
  naverId: string | null;
  kakaoId: string | null;
  fbId: string | null;
  googleId: string | null;
  phoneNumber: string | null;
  profileDescription: string | null;
  trainer: Trainer | null;
  comments: Array<Comment> | null;
  reviews: Array<Review> | null;
  favorites: Array<Favorite> | null;
  fullName: string;
  isTrainer: boolean;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Comment {
  id: number;
  text: string;
  userId: number | null;
  user: User;
  trainerId: number | null;
  trainer: Trainer;
  parentComment: Comment | null;
  childComments: Array<Comment> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Review {
  id: number;
  text: string;
  ratingForExpertise: number;
  ratingForFriendliness: number;
  userId: number | null;
  user: User;
  trainerId: number | null;
  trainer: Trainer;
  createdAt: string;
  updatedAt: string | null;
}

export interface Favorite {
  id: number;
  userId: number | null;
  user: User;
  trainerId: number | null;
  trainer: Trainer;
  createdAt: string;
  updatedAt: string | null;
}

export interface TrainingProgram {
  id: number;
  trainerId: number | null;
  trainer: Trainer;
  description: string | null;
  price: number | null;
  images: Array<string> | null;
  videos: Array<string> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface CheckUsernameResponse {
  ok: boolean;
  available: boolean | null;
  error: string | null;
}

export interface MeResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateComment: CreateCommentResponse;
  DeleteComment: DeleteCommentResponse;
  EditComment: EditCommentResponse;
  ToggleFavorite: ToggleFavoriteResponse;
  CreateReview: CreateReviewResponse;
  DeleteReview: DeleteReviewResponse;
  EditReview: EditReviewResponse;
  CreateTrainer: CreateTrainerResponse;
  EditTrainer: EditTrainerResponse;
  CreateTrainingProgram: CreateTrainingProgramResponse;
  DeleteTrainingProgram: DeleteTrainingProgramResponse;
  EditTrainingProgram: EditTrainingProgramResponse;
  ConnectFB: ConnectFBResponse;
  ConnectGoogle: ConnectGoogleResponse;
  ConnectKakao: ConnectKakaoResponse;
  ConnectNaver: ConnectNaverResponse;
  EditUser: EditUserResponse;
}

export interface CreateCommentMutationArgs {
  text: string;
  trainerId: number;
  commentId: number | null;
}

export interface DeleteCommentMutationArgs {
  commentId: number;
}

export interface EditCommentMutationArgs {
  commentId: number;
  text: string;
}

export interface ToggleFavoriteMutationArgs {
  trainerId: number;
}

export interface CreateReviewMutationArgs {
  text: string;
  ratingForExpertise: number;
  ratingForFriendliness: number;
  trainerId: number;
}

export interface DeleteReviewMutationArgs {
  reviewId: number;
}

export interface EditReviewMutationArgs {
  reviewId: number;
  text: string;
  ratingForExpertise: number;
  ratingForFriendliness: number;
}

export interface CreateTrainerMutationArgs {
  userId: number;
  description: string;
  licenses: Array<string> | null;
  experiences: Array<string> | null;
  images: Array<string> | null;
  videos: Array<string> | null;
}

export interface EditTrainerMutationArgs {
  trainerId: number;
  description: string;
  licenses: Array<string> | null;
  experiences: Array<string> | null;
  images: Array<string> | null;
  videos: Array<string> | null;
}

export interface CreateTrainingProgramMutationArgs {
  trainerId: number;
  description: string;
  price: number;
  images: Array<string> | null;
  videos: Array<string> | null;
}

export interface DeleteTrainingProgramMutationArgs {
  trainingProgramId: number;
}

export interface EditTrainingProgramMutationArgs {
  trainingProgramId: number;
  description: string | null;
  price: number | null;
  images: Array<string> | null;
  videos: Array<string> | null;
}

export interface ConnectFbMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface ConnectGoogleMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  googleId: string;
}

export interface ConnectKakaoMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  kakaoId: string;
}

export interface ConnectNaverMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  naverId: string;
}

export interface EditUserMutationArgs {
  username: string | null;
  phoneNumber: string | null;
  profileDescription: string | null;
}

export interface CreateCommentResponse {
  ok: boolean;
  error: string | null;
  comment: Comment | null;
}

export interface DeleteCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface EditCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleFavoriteResponse {
  ok: boolean;
  error: string | null;
  add: boolean;
}

export interface CreateReviewResponse {
  ok: boolean;
  error: string | null;
  review: Review | null;
}

export interface DeleteReviewResponse {
  ok: boolean;
  error: string | null;
}

export interface EditReviewResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateTrainerResponse {
  ok: boolean;
  error: string | null;
  trainer: Trainer | null;
}

export interface EditTrainerResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateTrainingProgramResponse {
  ok: boolean;
  error: string | null;
  trainingProgram: TrainingProgram | null;
}

export interface DeleteTrainingProgramResponse {
  ok: boolean;
  error: string | null;
}

export interface EditTrainingProgramResponse {
  ok: boolean;
  error: string | null;
}

export interface ConnectFBResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  isNew: boolean;
}

export interface ConnectGoogleResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  isNew: boolean;
}

export interface ConnectKakaoResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  isNew: boolean;
}

export interface ConnectNaverResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  isNew: boolean;
}

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
}
