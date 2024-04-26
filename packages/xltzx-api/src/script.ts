import prisma from "./core/prisma";
import { genId } from "./utils";
import { hashPassword } from "./utils/auth";

async function main() {
  const role = await prisma.role.create({
    data: {
      id: genId(),
      name: "admin",
      rolePermissions: {
        create: [
          {
            id: genId(),
            permission: "*"
          }
        ]
      }
    }
  });
  const password = await hashPassword("e10adc3949ba59abbe56e057f20f883e");
  await prisma.staff.create({
    data: {
      id: genId(),
      code: "admin",
      name: "admin",
      password,
      staffRoles: {
        create: [
          {
            id: genId(),
            roleId: role.id
          }
        ]
      }
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

/* exec": "ts-node ./src/index.ts" */
