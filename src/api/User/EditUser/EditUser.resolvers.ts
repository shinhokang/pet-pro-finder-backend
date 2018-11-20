import User from "../../../entities/User";
import { EditUserMutationArgs, EditUserResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNull";
import privateResolver from "../../../utils/privateResolver";
import bcrypt from "bcrypt";

const resolvers = {
  Mutation: {
    EditUser: privateResolver(
      async (
        _,
        args: EditUserMutationArgs,
        { req }
      ): Promise<EditUserResponse> => {
        const user: User = req.user;
        try {
          let notNull: any = cleanNullArgs(args);
          if (notNull.password) {
            const passwordHash = bcrypt.hashSync(notNull.password, 10);
            notNull = { ...notNull, password: passwordHash };
          }
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            error,
            ok: false
          };
        }
      }
    )
  }
};
export default resolvers;
