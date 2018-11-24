import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  CreateTrainerMutationArgs,
  CreateTrainerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
// import License from "../../../entities/License";
// import Experience from "../../../entities/Experience";
// import WorkingArea from "../../../entities/WorkingArea";
// import { In } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    CreateTrainer: privateResolver(
      async (
        _,
        args: CreateTrainerMutationArgs,
        { req }
      ): Promise<CreateTrainerResponse> => {
        const user: User = req.user;
        const {
          title,
          description,
          images,
          videos
          // workingAreaIds,
          // licenseIds,
          // experienceIds
        } = args;
        try {
          if (user.isTrainer) {
            throw new Error("Trainer already exists");
          }
          let newTrainer = new Trainer();
          newTrainer.title = title;
          newTrainer.description = description;
          newTrainer.images = images;
          newTrainer.videos = videos;
          newTrainer.user = user;
          newTrainer.userId = user.id;

          // let workingAreas: WorkingArea[];
          // if (workingAreaIds) {
          //   workingAreas = await WorkingArea.find({
          //     where: {
          //       id: In(workingAreaIds)
          //     }
          //   });
          //   newTrainer.workingAreas = workingAreas;
          // }

          // let licenses: License[] | undefined;
          // if (licenseIds) {
          //   licenses = await License.find({
          //     where: {
          //       id: In(licenseIds)
          //     }
          //   });
          //   newTrainer.licenses = licenses;
          // }

          // let experiences: Experience[] | undefined;
          // if (experienceIds) {
          //   experiences = await Experience.find({
          //     where: {
          //       id: In(experienceIds)
          //     }
          //   });
          //   newTrainer.experiences = experiences;
          // }

          await newTrainer.save();

          user.trainerId = newTrainer.id;

          return {
            ok: true,
            error: null,
            trainer: newTrainer
          };
        } catch (error) {
          return {
            error,
            ok: false,
            trainer: null
          };
        }
      }
    )
  }
};

export default resolvers;
