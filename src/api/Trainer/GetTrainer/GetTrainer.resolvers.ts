import Trainer from "../../../entities/Trainer";
import { GetTrainerQueryArgs, GetTrainerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetTrainer: async (
      _,
      args: GetTrainerQueryArgs
    ): Promise<GetTrainerResponse> => {
      try {
        const trainer = await Trainer.findOne(
          { id: args.trainerId },
          {
            relations: [
              "user",
              "trainingPrograms",
              "comments",
              "comments.childComments",
              "reviews",
              "favorites"
            ]
          }
        );
        if (!trainer) {
          throw new Error("No trainer found");
        }
        return {
          trainer,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error,
          trainer: null
        };
      }
    }
  }
};

export default resolvers;
