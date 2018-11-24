export const typeDefs = ["type CreateCommentResponse {\n  ok: Boolean!\n  error: String\n  comment: Comment\n}\n\ntype Mutation {\n  CreateComment(text: String!, trainerId: Int!, commentId: Int): CreateCommentResponse!\n  DeleteComment(commentId: Int!): DeleteCommentResponse!\n  EditComment(commentId: Int!, text: String!): EditCommentResponse!\n  BulkDeleteExperience(trainerId: Int!, experienceIds: [Int!]!): BulkDeleteExperienceResponse!\n  BulkEditExperience(trainerId: Int!, experienceIds: [Int]!, texts: [String]!, periods: [String]!): BulkEditExperienceResponse!\n  ToggleFavorite(trainerId: Int!): ToggleFavoriteResponse!\n  CreateLicense(name: String!, organization: String): CreateLicenseResponse!\n  GetAllLicenses: GetAllLicensesResponse!\n  CreateReview(trainerId: Int!, title: String!, text: String!, ratingForExpertise: Float!, ratingForFriendliness: Float!, problemCategoryIds: [Int!]): CreateReviewResponse!\n  DeleteReview(reviewId: Int!): DeleteReviewResponse!\n  EditReview(reviewId: Int!, title: String!, text: String!, ratingForExpertise: Float!, ratingForFriendliness: Float!, problemCategoryIds: [Int]): EditReviewResponse!\n  CreateTrainer(title: String!, description: String!, images: [String], videos: [String]): CreateTrainerResponse!\n  EditTrainer(trainerId: Int!, description: String!, licenses: [String], experiences: [String], workingAreas: [String], images: [String], videos: [String]): EditTrainerResponse!\n  CreateTrainingProgram(trainerId: Int!, description: String!, price: Int!, problemCategories: [String], images: [String], videos: [String]): CreateTrainingProgramResponse!\n  DeleteTrainingProgram(trainingProgramId: Int!): DeleteTrainingProgramResponse!\n  EditTrainingProgram(trainingProgramId: Int!, description: String, price: Int, images: [String], videos: [String]): EditTrainingProgramResponse!\n  EditUser(name: String, password: String, phoneNumber: String, description: String, profileImage: String): EditUserResponse!\n  Join(email: String!, password: String!, name: String!): JoinResponse!\n  Login(email: String!, password: String!): LoginResponse!\n}\n\ntype DeleteCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Comment {\n  id: Int!\n  text: String!\n  parentComment: Comment\n  parentCommentId: Int\n  childComments: [Comment]\n  user: User!\n  userId: Int\n  trainer: Trainer!\n  trainerId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype BulkDeleteExperienceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype BulkEditExperienceResponse {\n  ok: Boolean!\n  error: String\n  experiences: [Experience]\n}\n\ntype Experience {\n  id: Int!\n  text: String!\n  period: String!\n  trainer: Trainer!\n  trainerId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Favorite {\n  id: Int!\n  marked: Boolean!\n  user: User!\n  userId: Int\n  trainer: Trainer!\n  trainerId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype ToggleFavoriteResponse {\n  ok: Boolean!\n  error: String\n  add: Boolean!\n}\n\ntype CreateLicenseResponse {\n  ok: Boolean!\n  error: String\n  license: License\n}\n\ntype GetAllLicensesResponse {\n  ok: Boolean!\n  error: String\n  licenses: [License]\n}\n\ntype License {\n  id: Int!\n  name: String!\n  organization: String\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetAllProblemCategoriesResponse {\n  ok: Boolean!\n  error: String\n  problemCategories: [ProblemCategory]\n}\n\ntype Query {\n  GetAllProblemCategories: GetAllProblemCategoriesResponse!\n  FilterTrainers(workingAreas: [String], page: Int, take: Int): FilterTrainersResponse!\n  GetAllTrainers: GetAllTrainersResponse!\n  GetTrainer(trainerId: Int!): GetTrainerResponse!\n  Me: MeResponse!\n}\n\ntype ProblemCategory {\n  id: Int!\n  name: String!\n  order: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateReviewResponse {\n  ok: Boolean!\n  error: String\n  review: Review\n}\n\ntype DeleteReviewResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditReviewResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Review {\n  id: Int!\n  title: String!\n  text: String!\n  ratingForExpertise: Float!\n  ratingForFriendliness: Float!\n  user: User!\n  userId: Int!\n  trainer: Trainer!\n  trainerId: Int!\n  problemCategories: [ProblemCategory]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTrainerResponse {\n  ok: Boolean!\n  error: String\n  trainer: Trainer\n}\n\ntype EditTrainerResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype FilterTrainersResponse {\n  ok: Boolean!\n  error: String\n  trainers: [Trainer]\n  page: Int!\n  totalPages: Int!\n}\n\ntype GetAllTrainersResponse {\n  ok: Boolean!\n  error: String\n  trainers: [Trainer]\n}\n\ntype GetTrainerResponse {\n  ok: Boolean!\n  error: String\n  trainer: Trainer\n}\n\ntype Trainer {\n  id: Int!\n  title: String!\n  description: String!\n  images: [String]\n  videos: [String]\n  experiences: [Experience]\n  user: User!\n  userId: Int!\n  trainingPrograms: [TrainingProgram]\n  comments: [Comment]\n  reviews: [Review]\n  favorites: [Favorite]\n  workingAreas: [WorkingArea]\n  licenses: [License]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTrainingProgramResponse {\n  ok: Boolean!\n  error: String\n  trainingProgram: TrainingProgram\n}\n\ntype DeleteTrainingProgramResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditTrainingProgramResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype TrainingProgram {\n  id: Int!\n  title: String\n  description: String\n  price: Int\n  images: [String]\n  videos: [String]\n  trainer: Trainer!\n  trainerId: Int!\n  problemCategories: [ProblemCategory]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype JoinResponse {\n  ok: Boolean!\n  error: String\n  token: String\n  isNew: Boolean!\n}\n\ntype LoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype MeResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  email: String!\n  name: String\n  password: String\n  naverId: String\n  kakaoId: String\n  fbId: String\n  googleId: String\n  phoneNumber: String\n  description: String\n  profileImage: String\n  trainerId: Int\n  trainer: Trainer\n  comments: [Comment]\n  reviews: [Review]\n  favorites: [Favorite]\n  isTrainer: Boolean!\n  profilePhoto: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype WorkingArea {\n  id: Int!\n  text: String!\n  parentWorkingArea: WorkingArea\n  parentWorkingAreaId: Int\n  childWorkingAreas: [WorkingArea]\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetAllProblemCategories: GetAllProblemCategoriesResponse;
  FilterTrainers: FilterTrainersResponse;
  GetAllTrainers: GetAllTrainersResponse;
  GetTrainer: GetTrainerResponse;
  Me: MeResponse;
}

export interface FilterTrainersQueryArgs {
  workingAreas: Array<string> | null;
  page: number | null;
  take: number | null;
}

export interface GetTrainerQueryArgs {
  trainerId: number;
}

export interface GetAllProblemCategoriesResponse {
  ok: boolean;
  error: string | null;
  problemCategories: Array<ProblemCategory> | null;
}

export interface ProblemCategory {
  id: number;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface FilterTrainersResponse {
  ok: boolean;
  error: string | null;
  trainers: Array<Trainer> | null;
  page: number;
  totalPages: number;
}

export interface Trainer {
  id: number;
  title: string;
  description: string;
  images: Array<string> | null;
  videos: Array<string> | null;
  experiences: Array<Experience> | null;
  user: User;
  userId: number;
  trainingPrograms: Array<TrainingProgram> | null;
  comments: Array<Comment> | null;
  reviews: Array<Review> | null;
  favorites: Array<Favorite> | null;
  workingAreas: Array<WorkingArea> | null;
  licenses: Array<License> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Experience {
  id: number;
  text: string;
  period: string;
  trainer: Trainer;
  trainerId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  password: string | null;
  naverId: string | null;
  kakaoId: string | null;
  fbId: string | null;
  googleId: string | null;
  phoneNumber: string | null;
  description: string | null;
  profileImage: string | null;
  trainerId: number | null;
  trainer: Trainer | null;
  comments: Array<Comment> | null;
  reviews: Array<Review> | null;
  favorites: Array<Favorite> | null;
  isTrainer: boolean;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Comment {
  id: number;
  text: string;
  parentComment: Comment | null;
  parentCommentId: number | null;
  childComments: Array<Comment> | null;
  user: User;
  userId: number | null;
  trainer: Trainer;
  trainerId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Review {
  id: number;
  title: string;
  text: string;
  ratingForExpertise: number;
  ratingForFriendliness: number;
  user: User;
  userId: number;
  trainer: Trainer;
  trainerId: number;
  problemCategories: Array<ProblemCategory> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Favorite {
  id: number;
  marked: boolean;
  user: User;
  userId: number | null;
  trainer: Trainer;
  trainerId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface TrainingProgram {
  id: number;
  title: string | null;
  description: string | null;
  price: number | null;
  images: Array<string> | null;
  videos: Array<string> | null;
  trainer: Trainer;
  trainerId: number;
  problemCategories: Array<ProblemCategory> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface WorkingArea {
  id: number;
  text: string;
  parentWorkingArea: WorkingArea | null;
  parentWorkingAreaId: number | null;
  childWorkingAreas: Array<WorkingArea> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface License {
  id: number;
  name: string;
  organization: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetAllTrainersResponse {
  ok: boolean;
  error: string | null;
  trainers: Array<Trainer> | null;
}

export interface GetTrainerResponse {
  ok: boolean;
  error: string | null;
  trainer: Trainer | null;
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
  BulkDeleteExperience: BulkDeleteExperienceResponse;
  BulkEditExperience: BulkEditExperienceResponse;
  ToggleFavorite: ToggleFavoriteResponse;
  CreateLicense: CreateLicenseResponse;
  GetAllLicenses: GetAllLicensesResponse;
  CreateReview: CreateReviewResponse;
  DeleteReview: DeleteReviewResponse;
  EditReview: EditReviewResponse;
  CreateTrainer: CreateTrainerResponse;
  EditTrainer: EditTrainerResponse;
  CreateTrainingProgram: CreateTrainingProgramResponse;
  DeleteTrainingProgram: DeleteTrainingProgramResponse;
  EditTrainingProgram: EditTrainingProgramResponse;
  EditUser: EditUserResponse;
  Join: JoinResponse;
  Login: LoginResponse;
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

export interface BulkDeleteExperienceMutationArgs {
  trainerId: number;
  experienceIds: Array<number>;
}

export interface BulkEditExperienceMutationArgs {
  trainerId: number;
  experienceIds: Array<number>;
  texts: Array<string>;
  periods: Array<string>;
}

export interface ToggleFavoriteMutationArgs {
  trainerId: number;
}

export interface CreateLicenseMutationArgs {
  name: string;
  organization: string | null;
}

export interface CreateReviewMutationArgs {
  trainerId: number;
  title: string;
  text: string;
  ratingForExpertise: number;
  ratingForFriendliness: number;
  problemCategoryIds: Array<number>;
}

export interface DeleteReviewMutationArgs {
  reviewId: number;
}

export interface EditReviewMutationArgs {
  reviewId: number;
  title: string;
  text: string;
  ratingForExpertise: number;
  ratingForFriendliness: number;
  problemCategoryIds: Array<number> | null;
}

export interface CreateTrainerMutationArgs {
  title: string;
  description: string;
  images: Array<string> | null;
  videos: Array<string> | null;
}

export interface EditTrainerMutationArgs {
  trainerId: number;
  description: string;
  licenses: Array<string> | null;
  experiences: Array<string> | null;
  workingAreas: Array<string> | null;
  images: Array<string> | null;
  videos: Array<string> | null;
}

export interface CreateTrainingProgramMutationArgs {
  trainerId: number;
  description: string;
  price: number;
  problemCategories: Array<string> | null;
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

export interface EditUserMutationArgs {
  name: string | null;
  password: string | null;
  phoneNumber: string | null;
  description: string | null;
  profileImage: string | null;
}

export interface JoinMutationArgs {
  email: string;
  password: string;
  name: string;
}

export interface LoginMutationArgs {
  email: string;
  password: string;
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

export interface BulkDeleteExperienceResponse {
  ok: boolean;
  error: string | null;
}

export interface BulkEditExperienceResponse {
  ok: boolean;
  error: string | null;
  experiences: Array<Experience> | null;
}

export interface ToggleFavoriteResponse {
  ok: boolean;
  error: string | null;
  add: boolean;
}

export interface CreateLicenseResponse {
  ok: boolean;
  error: string | null;
  license: License | null;
}

export interface GetAllLicensesResponse {
  ok: boolean;
  error: string | null;
  licenses: Array<License> | null;
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

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
}

export interface JoinResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
  isNew: boolean;
}

export interface LoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
