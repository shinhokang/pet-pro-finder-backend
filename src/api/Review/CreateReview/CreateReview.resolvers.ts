import Review from "../../../entities/Review";
import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  CreateReviewMutationArgs,
  CreateReviewResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import ProblemCategory from "../../../entities/ProblemCategory";
import { In } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    CreateReview: privateResolver(
      async (
        _,
        args: CreateReviewMutationArgs,
        { req }
      ): Promise<CreateReviewResponse> => {
        const user: User = req.user;
        const {
          title,
          text,
          ratingForExpertise,
          ratingForFriendliness,
          trainerId,
          problemCategoryIds
        } = args;
        try {
          let trainer: Trainer | undefined;
          if (trainerId) {
            trainer = await Trainer.findOne({ id: trainerId });
          }
          if (!trainer) {
            return {
              ok: false,
              error: "Trainer not found",
              review: null
            };
          }

          let problemCategories: ProblemCategory[] | undefined;
          if (problemCategoryIds) {
            problemCategories = await ProblemCategory.find({
              where: {
                id: In(problemCategoryIds)
              }
            });
          }

          const newReview = await Review.create({
            title,
            text,
            ratingForExpertise,
            ratingForFriendliness,
            trainer,
            user,
            problemCategories
          }).save();

          if (!newReview) {
            return {
              ok: false,
              error: `Cant create review`,
              review: null
            };
          }
          return {
            ok: true,
            error: null,
            review: newReview
          };
        } catch (error) {
          return {
            error,
            ok: false,
            review: null
          };
        }
      }
    )
  }
};

export default resolvers;
