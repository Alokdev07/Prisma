import prisma from "../database/db.config.js";

export const fetch_post = async (req, res) => {
  const posts = await prisma.post.findMany({
   include : {
    comment : {
      select : {
        comment : true,
        user : {
          select : {
            name : true
          }
        }
      }
    }
   },
   orderBy : {
    id : 'asc'
   }
  });
  return res.json({ data: posts });
};

export const pagination_post = async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 1

  if (page < 0 || limit > 100) {
    page = 1
    limit = 100
  }

  const skip = (page - 1)* limit

  const posts = await prisma.post.findMany({
    skip : skip,
    take : limit,
   
  });

  const total_post = await prisma.post.count()
  const total_page = Math.ceil(total_post/limit)
  return res.json({ data: posts,meta : {
    totalpage : total_page,
    limit : limit,
    Currentpage : page
  } });
};

export const fetch_post_condition = async (req,res) => {
  const post = await prisma.post.findMany({
    // where : {
    //   comment_count : {
    //     gt : 1
    //   }
    // }

    // where : {
    //   title : {
    //     startsWith : "nextjs"
    //   }
    // }

    // where : {
    //   OR : [
    //     {
    //       title : {
    //         startsWith : 'next'
    //       }
    //     },
    //     {
    //       title : {
    //         endsWith : "tutorial"
    //       }
    //     }
    //   ]
    // }

    where : {
      AND : [
        {
          title : {
            startsWith : 'next'
          }
        },
        {
          title : {
            endsWith : "tutorial"
          }
        }
      ]
    }
  })
  return res.json({data : post})
}

export const search_post = async(req,res) => {
  const query = req.query.query
  const post = await prisma.post.findMany({
    where : {
      description : {
        search : query,
        mode : "insensitive"
      }
    }
  })

  return res.json({data : post})
}

export const create_post = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title: title,
      description: description,
    },
  });

  if (!newPost)
    return res.json({ statuscode: 500, message: "internal server error" });

  return res
    .status(200)
    .json({ data: newPost, message: "user created successfully" });
};

export const update_post = async (req, res) => {
  try {
    const userId = req.params.id;
    const { user_id, title, description } = req.body;

    const updateUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        user_id: user_id,
        title: title,
        description: description,
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

export const show_post = async (req, res) => {
  const userId = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(userId),
    },
  });
  if (!post) return res.json({ status: 404, message: "user not found" });

  return res
    .status(200)
    .json({ data: post, message: "user fetched successfully" });
};

export const delete_post = async (req, res) => {
  const postId = req.params.id;
  const delete_post = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  if (!delete_post) return res.json({ message: "internal server error" });
  return res.json({ message: "user deleted successfully", data: delete_post });
};
