import { getConnection } from "typeorm";
import Trainer from "../../../entities/Trainer";
import {
  FilterTrainersQueryArgs,
  FilterTrainersResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    FilterTrainers: async (
      _,
      args: FilterTrainersQueryArgs
    ): Promise<FilterTrainersResponse> => {
      const { page, take } = args;
      const defaultPage = page || 0;

      let trainers: Trainer[];
      let totalPages = 0;
      try {
        [trainers, totalPages] = await getConnection()
          .getRepository(Trainer)
          .findAndCount({
            take: take || 25,
            skip: 25 * defaultPage,
            order: {
              updatedAt: "DESC"
            },
            relations: ["trainingPrograms", "reviews"]
          });

        return {
          trainers,
          ok: true,
          error: null,
          page: page || 0,
          totalPages: Math.floor(totalPages / 25)
        };
      } catch (error) {
        return {
          trainers: null,
          ok: false,
          error,
          page: 0,
          totalPages: 0
        };
      }
    }
  }
};

export default resolvers;
