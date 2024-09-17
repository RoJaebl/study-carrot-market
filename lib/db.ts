import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  // const token = await db.sMSToken.create({
  //   data: {
  //     token: "2314123",
  //     user: {
  //       connect: {
  //         id: 2,
  //       },
  //     },
  //   },
  // });
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });
}

test();

export default db;
