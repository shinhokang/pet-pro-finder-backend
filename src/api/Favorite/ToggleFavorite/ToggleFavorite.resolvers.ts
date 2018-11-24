import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import Favorite from "../../../entities/Favorite";
import {
  ToggleFavoriteMutationArgs,
  ToggleFavoriteResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    ToggleFavorite: privateResolver(
      async (
        _,
        args: ToggleFavoriteMutationArgs,
        { req }
      ): Promise<ToggleFavoriteResponse> => {
        const user: User = req.user;
        try {
          const existingFavorite = await Favorite.findOne({
            trainerId: args.trainerId,
            user
          });
          if (existingFavorite) {
            existingFavorite.marked = !existingFavorite.marked;
            await existingFavorite.save();
            return {
              ok: true,
              error: null,
              add: false
            };
          }

          const trainer = await Trainer.findOne({ id: args.trainerId });
          if (!trainer) {
            return {
              ok: false,
              error: `Trainer not found`,
              add: false
            };
          }
          await Favorite.create({
            marked: true,
            userId: user.id,
            user,
            trainerId: args.trainerId,
            trainer
          }).save();

          return {
            ok: true,
            error: null,
            add: true
          };
        } catch (error) {
          return {
            error,
            ok: false,
            add: false
          };
        }
      }
    )
  }
};

export default resolvers;
