import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  EditTrainerMutationArgs,
  EditTrainerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditTrainer: privateResolver(
      async (
        _,
        args: EditTrainerMutationArgs,
        { req }
      ): Promise<EditTrainerResponse> => {
        const user: User = req.user;
        const {
          trainerId,
          description,
          licenses,
          experiences,
          images,
          videos
        } = args;
        try {
          await Trainer.update(
            {
              id: trainerId,
              user: user
            },
            { description, licenses, experiences, images, videos }
          );
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
