import Review from "../../../entities/Review";
import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  CreateReviewMutationArgs,
  CreateReviewResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

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
          text,
          ratingForExpertise,
          ratingForFriendliness,
          trainerId
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
          const newReview = await Review.create({
            text,
            ratingForExpertise,
            ratingForFriendliness,
            trainer,
            user
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
