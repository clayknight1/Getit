import db from "./data";

export async function getListsForUser(userId: number) {}

// import { prisma } from "./data";

// export async function getListsForUser(userId: number) {
//   const groupStoresWithLists = await prisma.stores.findMany({
//     where: {
//       groups: {
//         group_members: {
//           some: {
//             user_id: userId,
//           },
//         },
//       },
//     },

//     select: {
//       id: true,
//       name: true,
//       group_id: true,

//       list_items: {
//         select: {
//           // the user who added this item
//           users_list_items_added_byTousers: {
//             select: {
//               id: true,
//               name: true,
//               email: true, // you don't have username/avatar
//               role: true,
//             },
//           },

//           added_by: true,
//           created_at: true,
//           name: true,
//           quantity: true,
//           notes: true,
//           needed: true,
//           purchased: true,
//         },

//         orderBy: {
//           created_at: "desc",
//         },
//       },
//     },
//   });
//   return groupStoresWithLists;
// }
