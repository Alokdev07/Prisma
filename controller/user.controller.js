import prisma from "../database/db.config.js";

export const fetch_user = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      // post : {
      //     // select : {
      //     //     // title : true, // here this is define to get the selected field in a database
      //     //     // comment : true
      //     // }

      // }
      _count: {
        select: {
          post: true,
          comment: true,
        },
      },
    },
  });
  return res.json({ data: users });
};

export const create_user = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser)
    return res
      .status(400)
      .json({ message: "email already exists in database" });

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  if (!newUser)
    return res.json({ statuscode: 500, message: "internal server error" });

  return res
    .status(200)
    .json({ data: newUser, message: "user created successfully" });
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const updateUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password,
      },
    });

    if (!updateUser) return res.status(400).json("server error cant update");

    return res
      .status(200)
      .json({ data: updateUser, message: "user update successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};

export const show_user = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  if (!user) return res.json({ status: 404, message: "user not found" });

  return res
    .status(200)
    .json({ data: user, message: "user fetched successfully" });
};

export const delete_user = async (req, res) => {
  const userId = req.params.id;
  const delete_user = await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  if (!delete_user) return res.json({ message: "internal server error" });
  return res.json({ message: "user deleted successfully", data: delete_user });
};
