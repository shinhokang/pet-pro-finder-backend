import TrainingProgram from "../../../entities/TrainingProgram";
import User from "../../../entities/User";
import {
  DeleteTrainingProgramMutationArgs,
  DeleteTrainingProgramResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeleteReview: privateResolver(
      async (
        _,
        args: DeleteTrainingProgramMutationArgs,
        { req }
      ): Promise<DeleteTrainingProgramResponse> => {
        const user: User = req.user;
        if (!user.trainer) {
          return {
            ok: false,
            error: "Trainer not found"
          };
        }
        try {
          const trainingProgram = await TrainingProgram.findOne({
            id: args.trainingProgramId
          });
          if (!trainingProgram) {
            return {
              ok: false,
              error: "Training Program not found"
            };
          }
          if (user.trainer && trainingProgram.trainerId !== user.trainer.id) {
            return {
              ok: false,
              error: "Cant delete"
            };
          }
          trainingProgram.remove();
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
