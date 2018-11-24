import Review from "../../../entities/Review";
import User from "../../../entities/User";
import ProblemCategory from "../../../entities/ProblemCategory";
import {
  EditReviewMutationArgs,
  EditReviewResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { In } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    EditReview: privateResolver(
      async (
        _,
        args: EditReviewMutationArgs,
        { req }
      ): Promise<EditReviewResponse> => {
        const user: User = req.user;
        const {
          reviewId,
          title,
          text,
          ratingForExpertise,
          ratingForFriendliness,
          problemCategoryIds
        } = args;

        try {
          let problemCategories: ProblemCategory[] | undefined;
          if (problemCategoryIds) {
            problemCategories = await ProblemCategory.find({
              where: {
                id: In(problemCategoryIds)
              }
            });
          }

          await Review.update(
            {
              user: user,
              id: reviewId
            },
            {
              title,
              text,
              ratingForExpertise,
              ratingForFriendliness,
              problemCategories
            }
          );
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            error,
            ok: false
          };
        }
      }
    )
  }
};

export default resolvers;
