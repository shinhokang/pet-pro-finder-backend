import Comment from "../../../entities/Comment";
import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  CreateCommentMutationArgs,
  CreateCommentResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CreateComment: privateResolver(
      async (
        _,
        args: CreateCommentMutationArgs,
        { req }
      ): Promise<CreateCommentResponse> => {
        const user: User = req.user;
        const { commentId, text, trainerId } = args;
        try {
          let parentComment: Comment | undefined;
          if (commentId) {
            parentComment = await Comment.findOne({ id: commentId });
          }
          let trainer: Trainer | undefined;
          if (trainerId) {
            trainer = await Trainer.findOne({ id: trainerId });
          }
          if (!trainer && !parentComment) {
            return {
              ok: false,
              error: "Trainer not found",
              comment: null
            };
          }

          const newComment = await Comment.create({
            text,
            trainer,
            trainerId: trainer ? trainer.id : null,
            user,
            userId: user.id,
            parentComment,
            parentCommentId: parentComment ? parentComment.id : null
          }).save();
          if (!newComment) {
            return {
              ok: false,
              error: `Cant create comment`,
              comment: null
            };
          }
          return {
            ok: true,
            error: null,
            comment: newComment
          };
        } catch (error) {
          return {
            error,
            ok: false,
            comment: null
          };
        }
      }
    )
  }
};

export default resolvers;
