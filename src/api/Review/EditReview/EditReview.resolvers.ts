import Review from "../../../entities/Review";
import User from "../../../entities/User";
import {
  EditReviewMutationArgs,
  EditReviewResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditReview: privateResolver(
      async (
        _,
        args: EditReviewMutationArgs,
        { req }
      ): Promise<EditReviewResponse> => {
        const user: User = req.user;
        try {
          await Review.update(
            {
              user: user,
              id: args.reviewId
            },
            {
              text: args.text,
              ratingForExpertise: args.ratingForExpertise,
              ratingForFriendliness: args.ratingForFriendliness
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
