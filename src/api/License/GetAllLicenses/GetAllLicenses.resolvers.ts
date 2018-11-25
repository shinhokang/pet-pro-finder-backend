import License from "../../../entities/License";
import { GetAllLicensesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetAllLicenses: async (_, __): Promise<GetAllLicensesResponse> => {
      try {
        const licenses = await License.find({
          order: {
            organization: "ASC",
            name: "ASC"
          },
          cache: true
        });
        return {
          licenses,
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error,
          licenses: null
        };
      }
    }
  }
};

export default resolvers;
