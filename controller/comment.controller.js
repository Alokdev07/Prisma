import prisma from "../database/db.config.js";

export const fetch_comment = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include : {
        user : true,
        post : true
    }
  });
  return res.json({ data: comments });
};



export const create_comment = async (req, res) => {
  const { comment, postId,userId } = req.body;

  const new_comment = await prisma.comment.create({
    data: {
      comment : comment,
      post_id : Number(postId),
      user_id : Number(userId)
    },
    
  });

  

  if (!new_comment)
    return res.json({ statuscode: 500, message: "internal server error" });

  const update = await prisma.post.update({
    where : {
        id : postId
    },
    data : {
        comment_count : {
            increment : 1
        }
    }
  })

  if(!update) return res.json({status : 500,message : "internal server error"})

  return res
    .status(200)
    .json({ data: new_comment, message: "comment created successfully" });
};

export const update_comment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment,postId,userId } = req.body;

    const update_comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        comment : comment,
        post_id : Number(postId),
        user_id : Number(userId)
      },
    });

    if (!update_comment) return res.status(400).json("server error cant update");

    return res
      .status(200)
      .json({ data: update_comment, message: "comment update successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};

export const show_comment = async (req, res) => {
  const commentId = req.params.id;
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!comment) return res.json({ status: 404, message: "comment not found" });

  return res
    .status(200)
    .json({ data: comment, message: "comment fetched successfully" });
};

export const delete_comment = async (req, res) => {
  const commentId = req.params.id;
  const {postId} = req.body
  const delete_comment = await prisma.comment.delete({
    where: {
      id: commentId
    },
  });
  const update = await prisma.post.update({
    where : {
        id : postId
    },
    data : {
        comment_count : {
            decrement : 1
        }
    }
  })
  if (!delete_comment && !update) return res.json({ message: "internal server error" });
  return res.json({ message: "comment deleted successfully", data: delete_comment });
};
