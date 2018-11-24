import User from "../../../entities/User";
import {
  CreateLicenseMutationArgs,
  CreateLicenseResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import License from "../../../entities/License";

const resolvers: Resolvers = {
  Mutation: {
    CreateLicense: async (
      _,
      args: CreateLicenseMutationArgs
    ): Promise<CreateLicenseResponse> => {
      const { name, organization } = args;

      try {
        const license = await License.findOne({ name, organization });
        if (license) {
          throw new Error("License already exists");
        }

        const newLicense = await License.create({
          name,
          organization
        }).save();

        return {
          ok: true,
          error: null,
          license: newLicense
        };
      } catch (error) {
        return {
          error,
          ok: false,
          license: null
        };
      }
    }
  }
};

export default resolvers;
