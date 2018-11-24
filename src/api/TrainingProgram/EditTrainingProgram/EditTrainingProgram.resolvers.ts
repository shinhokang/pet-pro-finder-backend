// import TrainingProgram from "../../../entities/TrainingProgram";
// import User from "../../../entities/User";
// import {
//   EditTrainingProgramMutationArgs,
//   EditTrainingProgramResponse
// } from "../../../types/graph";
// import { Resolvers } from "../../../types/resolvers";
// import privateResolver from "../../../utils/privateResolver";
// import cleanNullArgs from "../../../utils/cleanNull";

// const resolvers: Resolvers = {
//   Mutation: {
//     EditTrainingProgram: privateResolver(
//       async (
//         _,
//         args: EditTrainingProgramMutationArgs,
//         { req }
//       ): Promise<EditTrainingProgramResponse> => {
//         const user: User = req.user;
//         if (!user.trainer) {
//           return {
//             ok: false,
//             error: `Trainer not found`
//           };
//         }

//         try {
//           const notNull: any = cleanNullArgs(args);
//           await TrainingProgram.update(
//             {
//               trainer: user.trainer,
//               id: args.trainingProgramId
//             },
//             {
//               ...notNull
//             }
//           );
//           return {
//             ok: true,
//             error: null
//           };
//         } catch (error) {
//           return {
//             error,
//             ok: false
//           };
//         }
//       }
//     )
//   }
// };

// export default resolvers;
