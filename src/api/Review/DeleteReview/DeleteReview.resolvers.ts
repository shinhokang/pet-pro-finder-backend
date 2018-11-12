import Review from "../../../entities/Review";
import User from "../../../entities/User";
import {
  DeleteReviewMutationArgs,
  DeleteReviewResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeleteReview: privateResolver(
      async (
        _,
        args: DeleteReviewMutationArgs,
        { req }
      ): Promise<DeleteReviewResponse> => {
        const user: User = req.user;
        try {
          const review = await Review.findOne({ id: args.reviewId });
          if (!review) {
            return {
              ok: false,
              error: "Review not found"
            };
          }

          if (review.userId !== user.id) {
            return {
              ok: false,
              error: "Cant delete"
            };
          }
          review.remove();
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
