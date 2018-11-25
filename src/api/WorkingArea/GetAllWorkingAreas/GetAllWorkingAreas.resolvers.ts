import WorkingArea from "../../../entities/WorkingArea";
import { GetAllWorkingAreasResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { IsNull } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetAllWorkingAreas: async (_, __): Promise<GetAllWorkingAreasResponse> => {
      try {
        const workingAreas = await WorkingArea.find({
          where: {
            parentWorkingAreaId: IsNull()
          },
          order: {
            text: "ASC"
          },
          cache: true,
          relations: ["childWorkingAreas"]
        });
        return {
          workingAreas,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error,
          workingAreas: null
        };
      }
    }
  }
};

export default resolvers;
