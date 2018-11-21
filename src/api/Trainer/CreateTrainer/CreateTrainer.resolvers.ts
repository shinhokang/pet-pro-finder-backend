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
        const {
          description,
          licenses,
          experiences,
          images,
          videos,
          workingAreas
        } = args;
        try {
          if (user.isTrainer) {
            throw new Error("Trainer already exists");
          }
          const newTrainer = await Trainer.create({
            description,
            licenses,
            experiences,
            images,
            videos,
            workingAreas,
            user
          }).save();
          if (!newTrainer) {
            throw new Error("Cant create trainer");
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
