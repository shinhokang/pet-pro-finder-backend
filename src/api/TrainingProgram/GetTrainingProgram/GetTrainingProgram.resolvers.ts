import TrainingProgram from "../../../entities/TrainingProgram";
import {
  GetTrainingProgramQueryArgs,
  GetTrainingProgramResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetTrainingProgram: async (
      _,
      args: GetTrainingProgramQueryArgs
    ): Promise<GetTrainingProgramResponse> => {
      try {
        const trainingProgram = await TrainingProgram.findOne(
          { id: args.trainingProgramId },
          {
            relations: ["problemCategories"]
          }
        );
        if (!trainingProgram) {
          throw new Error("No traininig program found");
        }
        return {
          trainingProgram,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error,
          trainingProgram: null
        };
      }
    }
  }
};

export default resolvers;
