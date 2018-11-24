import { getConnection } from "typeorm";
import User from "../../../entities/User";
import {
  BulkDeleteExperienceMutationArgs,
  BulkDeleteExperienceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Experience from "../../../entities/Experience";

const resolvers: Resolvers = {
  Mutation: {
    BulkDeleteExperience: privateResolver(
      async (
        _,
        args: BulkDeleteExperienceMutationArgs,
        { req }
      ): Promise<BulkDeleteExperienceResponse> => {
        const user: User = req.user;
        const { trainerId, experienceIds } = args;
        if (user.trainerId !== trainerId) {
          return {
            ok: false,
            error: "No permission"
          };
        }

        try {
          // await Experience.delete({
          //   id: In(experienceIds),
          //   trainerId: trainerId
          // });
          experienceIds.forEach(async id => {
            await getConnection()
              .createQueryBuilder()
              .delete()
              .from(Experience)
              .where("id = :id", { id: id })
              .andWhere("trainerId = :trainerId", { trainerId: trainerId })
              .execute();
          });

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
