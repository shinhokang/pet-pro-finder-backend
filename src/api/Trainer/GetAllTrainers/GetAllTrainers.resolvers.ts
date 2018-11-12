import Trainer from "../../../entities/Trainer";
import { GetAllTrainersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetAllTrainers: privateResolver(
      async (_, __, { req }): Promise<GetAllTrainersResponse> => {
        try {
          const trainers = await Trainer.find();
          return {
            trainers,
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error,
            trainers: null
          };
        }
      }
    )
  }
};

export default resolvers;
