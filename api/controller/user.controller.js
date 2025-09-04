
import prisma from "../database/db.config.js";

export const create_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const find_user = await prisma.
  } catch (error) {}
};
