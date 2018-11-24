// import Trainer from "../../../entities/Trainer";
// import User from "../../../entities/User";
// import {
//   CreateTrainerMutationArgs,
//   CreateTrainerResponse
// } from "../../../types/graph";
// import { Resolvers } from "../../../types/resolvers";
// import privateResolver from "../../../utils/privateResolver";
// import License from "../../../entities/License";
// import Experience from "../../../entities/Experience";
// import WorkingArea from "../../../entities/WorkingArea";

// // TODO: find an elegant way to do Create relations

// const resolvers: Resolvers = {
//   Mutation: {
//     CreateTrainer: privateResolver(
//       async (
//         _,
//         args: CreateTrainerMutationArgs,
//         { req }
//       ): Promise<CreateTrainerResponse> => {
//         const user: User = req.user;
//         const {
//           title,
//           description,
//           licenses,
//           experiences,
//           workingAreas,
//           images,
//           videos
//         } = args;
//         try {
//           if (user.isTrainer) {
//             throw new Error("Trainer already exists");
//           }
//           let newTrainer = new Trainer();
//           newTrainer.title = title;
//           newTrainer.description = description;
//           newTrainer.images = images;
//           newTrainer.videos = videos;
//           newTrainer.user = user;

//           await newTrainer.save();
//           if (licenses) {
//             try {
//               let newLicenses = licenses.map(license => {

//                 let newLicense = new License();
//                 newLicense.text = license;
//                 newLicense.trainer = newTrainer;
//                 newLicense.save();
//                 return newLicense;
//               });
//               newTrainer.licenses = newLicenses;
//             } catch (error) {}
//           }

//           if (experiences) {
//             try {
//               let newExperiences = experiences.map(experience => {
//                 let newExperience = new Experience();
//                 newExperience.text = experience;
//                 newExperience.trainer = newTrainer;
//                 newExperience.save();
//                 return newExperience;
//               });
//               newTrainer.experiences = newExperiences;
//             } catch (error) {}
//           }

//           if (workingAreas) {
//             try {
//               let newWorkingAreas = workingAreas.map(workingArea => {
//                 let newWorkingArea = new WorkingArea();
//                 newWorkingArea.text = workingArea;
//                 newWorkingArea.trainer = newTrainer;
//                 newWorkingArea.save();
//                 return newWorkingArea;
//               });
//               newTrainer.workingAreas = newWorkingAreas;
//             } catch (error) {}
//           }

//           await newTrainer.save();

//           return {
//             ok: true,
//             error: null,
//             trainer: newTrainer
//           };
//         } catch (error) {
//           return {
//             error,
//             ok: false,
//             trainer: null
//           };
//         }
//       }
//     )
//   }
// };

// export default resolvers;
