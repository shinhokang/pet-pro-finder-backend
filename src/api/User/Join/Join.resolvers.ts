import User from "../../../entities/User";
import { JoinMutationArgs, JoinResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    Join: async (_, args: JoinMutationArgs): Promise<JoinResponse> => {
      const { email, password, name } = args;

      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("User already exists");
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
          email,
          password: passwordHash,
          name
        }).save();
        const token = await createJWT(newUser.id);
        return {
          ok: true,
          token,
          error: null,
          isNew: true
        };
      } catch (error) {
        return {
          error,
          ok: false,
          token: null,
          isNew: false
        };
      }
    }
  }
};

export default resolvers;
