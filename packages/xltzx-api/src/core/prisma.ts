import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
// const xprisma = prisma.$extends({
//   name: "soft-delete",
//   query: {
//     $allModels: {
//       async findMany({ args, query }) {
//         // inject read filter
//         args.where = { deletedAt: null, ...args.where };
//         return query(args);
//       },

//       async findFirst({ args, query }) {
//         // inject read filter
//         args.where = { deletedAt: null, ...args.where };
//         return query(args);
//       },

//       async findUnique({ args, query }) {
//         // inject read filter
//         args.where = { deletedAt: null, ...args.where } as any;
//         return query(args);
//       },

//       async findFirstOrThrow({ args, query }) {
//         // inject read filter
//         args.where = { deletedAt: null, ...args.where };
//         return query(args);
//       },

//       async findUniqueOrThrow({ args, query }) {
//         // inject read filter
//         args.where = { deletedAt: null, ...args.where } as any;
//         return query(args);
//       },

//       async delete({ model, args }) {
//         // translate "delete" to "update"
//         return (prisma as any)[model].update({
//           ...args,
//           data: { deletedAt: new Date() },
//         });
//       },

//       async deleteMany({ model, args }) {
//         // translate "delete" to "update"
//         return (prisma as any)[model].updateMany({
//           ...args,
//           data: { deletedAt: new Date() },
//         });
//       },
//     },
//   },
// });
//
// export default xprisma;
