import Trainer from "../../../entities/Trainer";
import User from "../../../entities/User";
import {
  EditTrainerMutationArgs,
  EditTrainerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import License from "../../../entities/License";
import Experience from "../../../entities/Experience";
import WorkingArea from "../../../entities/WorkingArea";

// TODO: Should edit licenses, experiences, workingAreas instead of just adding

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
          workingAreas,
          images,
          videos
        } = args;
        try {
          const trainer = await Trainer.findOne({ id: trainerId, user: user });
          if (!trainer) {
            throw new Error("no trainer found");
          }
          trainer.description = description;
          trainer.images = images;
          trainer.videos = videos;

          if (licenses) {
            try {
              let newLicenses = licenses.map(license => {
                let newLicense = new License();
                newLicense.text = license;
                newLicense.trainer = trainer;
                newLicense.save();
                return newLicense;
              });
              trainer.licenses = newLicenses;
            } catch (error) {}
          }

          if (experiences) {
            try {
              let newExperiences = experiences.map(experience => {
                let newExperience = new Experience();
                newExperience.text = experience;
                newExperience.trainer = trainer;
                newExperience.save();
                return newExperience;
              });
              trainer.experiences = newExperiences;
            } catch (error) {}
          }

          if (workingAreas) {
            try {
              let newWorkingAreas = workingAreas.map(workingArea => {
                let newWorkingArea = new WorkingArea();
                newWorkingArea.text = workingArea;
                newWorkingArea.trainer = trainer;
                newWorkingArea.save();
                return newWorkingArea;
              });
              trainer.workingAreas = newWorkingAreas;
            } catch (error) {}
          }

          await trainer.save();
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
