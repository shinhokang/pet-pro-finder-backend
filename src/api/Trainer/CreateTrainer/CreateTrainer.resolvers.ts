import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  CreateTrainerMutationArgs,
  CreateTrainerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CreateTrainer: privateResolver(
      async (
        _,
        args: CreateTrainerMutationArgs,
        { req }
      ): Promise<CreateTrainerResponse> => {
        const user: User = req.user;
        const { description, licenses, experiences, images, videos } = args;
        try {
          let trainer: Trainer | undefined;
          trainer = await Trainer.findOne({ userId: user.id });
          if (trainer) {
            return {
              ok: false,
              error: `Trainer already exists`,
              trainer: null
            };
          }
          const newTrainer = await Trainer.create({
            description,
            licenses,
            experiences,
            images,
            videos,
            user
          }).save();
          if (!newTrainer) {
            return {
              ok: false,
              error: `Cant create trainer`,
              trainer: null
            };
          }
          return {
            ok: true,
            error: null,
            trainer: newTrainer
          };
        } catch (error) {
          return {
            error,
            ok: false,
            trainer: null
          };
        }
      }
    )
  }
};

export default resolvers;
