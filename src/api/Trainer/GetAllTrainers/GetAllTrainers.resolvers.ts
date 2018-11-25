import Trainer from "../../../entities/Trainer";
import { GetAllTrainersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetAllTrainers: async (_, __): Promise<GetAllTrainersResponse> => {
      try {
        const trainers = await Trainer.find({
          relations: [
            "user",
            "licenses",
            "experiences",
            "workingAreas",
            "trainingPrograms",
            "comments",
            "comments.childComments",
            "reviews",
            "favorites"
          ]
        });
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
  }
};

export default resolvers;
