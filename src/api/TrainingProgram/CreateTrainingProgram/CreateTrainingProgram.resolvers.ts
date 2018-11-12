import TrainingProgram from "../../../entities/TrainingProgram";
import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  CreateTrainingProgramMutationArgs,
  CreateTrainingProgramResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CreateTrainingProgram: privateResolver(
      async (
        _,
        args: CreateTrainingProgramMutationArgs,
        { req }
      ): Promise<CreateTrainingProgramResponse> => {
        const user: User = req.user;
        const { trainerId, description, price, images, videos } = args;
        try {
          let trainer: Trainer | undefined;
          trainer = await Trainer.findOne({ id: trainerId, user });
          if (!trainer) {
            return {
              ok: false,
              error: `Trainer not found`,
              trainingProgram: null
            };
          }

          const newTrainingProgram = await TrainingProgram.create({
            trainer,
            description,
            price,
            images,
            videos
          }).save();
          if (!newTrainingProgram) {
            return {
              ok: false,
              error: `Cant create training program`,
              trainingProgram: null
            };
          }
          return {
            ok: true,
            error: null,
            trainingProgram: newTrainingProgram
          };
        } catch (error) {
          return {
            error,
            ok: false,
            trainingProgram: null
          };
        }
      }
    )
  }
};

export default resolvers;
