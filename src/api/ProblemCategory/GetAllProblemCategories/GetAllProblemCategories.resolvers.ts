import ProblemCategory from "../../../entities/ProblemCategory";
import { GetAllProblemCategoriesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetAllProblemCategories: async (
      _,
      __
    ): Promise<GetAllProblemCategoriesResponse> => {
      try {
        const problemCategories = await ProblemCategory.find({
          order: {
            order: "ASC"
          },
          cache: true
        });

        return {
          problemCategories,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error,
          problemCategories: null
        };
      }
    }
  }
};

export default resolvers;
