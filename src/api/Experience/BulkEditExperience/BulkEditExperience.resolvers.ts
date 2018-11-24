import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  BulkEditExperienceMutationArgs,
  BulkEditExperienceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Experience from "../../../entities/Experience";

const resolvers: Resolvers = {
  Mutation: {
    BulkEditExperience: privateResolver(
      async (
        _,
        args: BulkEditExperienceMutationArgs,
        { req }
      ): Promise<BulkEditExperienceResponse> => {
        const user: User = req.user;
        const { trainerId, experienceIds, texts, periods } = args;

        if (
          experienceIds.length === 0 ||
          (experienceIds.length !== texts.length &&
            texts.length !== periods.length)
        ) {
          return {
            ok: false,
            error: "Wrong input",
            experiences: null
          };
        }

        try {
          let trainer: Trainer | undefined;
          if (trainerId) {
            trainer = await Trainer.findOne({
              where: { id: trainerId, userId: user.id }
            });
          }
          if (!trainer) {
            return {
              ok: false,
              error: "Trainer not found",
              experiences: null
            };
          }
          const trainerC: Trainer = trainer;

          let promises = experienceIds.map(async (id, index) => {
            let experience: Experience | undefined;
            if (id) {
              experience = await Experience.findOne({
                where: { id: id, trainerId: trainerId }
              });
            }
            if (!experience) {
              experience = await new Experience();
            }

            experience.trainer = trainerC;
            experience.trainerId = trainerId;
            experience.text = texts[index];
            experience.period = periods[index];
            await experience.save();

            return experience;
          });

          const experiences = await Promise.all(promises);

          if (!experiences) {
            return {
              ok: false,
              error: `No experience is found and created`,
              experiences: null
            };
          }
          return {
            ok: true,
            error: null,
            experiences
          };
        } catch (error) {
          return {
            error,
            ok: false,
            experiences: null
          };
        }
      }
    )
  }
};

export default resolvers;
