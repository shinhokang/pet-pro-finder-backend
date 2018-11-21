import User from "../../../entities/User";
import { LoginMutationArgs, LoginResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    Login: async (_, args: LoginMutationArgs): Promise<LoginResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found by email");
        }
        const hash = user.password;
        if (!hash) {
          throw new Error("No password saved");
        }
        if (!bcrypt.compareSync(password, hash)) {
          throw new Error("Password not match");
        }

        const token = await createJWT(user.id);
        return {
          ok: true,
          token,
          error: null
        };
      } catch (error) {
        return {
          error,
          ok: false,
          token: null
        };
      }
    }
  }
};

export default resolvers;
