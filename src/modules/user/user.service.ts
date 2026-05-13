import prisma from "../../config/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });
};

const updateRole = async (id: any, role: string) => {
  return prisma.user.update({
    where: { id },
    data: { role }
  });
};

const deleteUser = async (id: any) => {
  return prisma.user.delete({
    where: { id }
  });
};

export default {
  getAllUsers,
  updateRole,
  deleteUser
};