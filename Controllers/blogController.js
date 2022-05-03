import mongoose from "mongoose";
import BlogModel from "../Models/BlogModel";
import UsersModel from "../Models/UsersModel";

// get all blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await BlogModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ msg: "No blog post at the moment" });
  }

  return res.status(200).json({ blogs });
};

// add blogs
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let exitUser;
  try {
    exitUser = await UsersModel.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!exitUser) {
    return res.status(400).json({ msg: "User not Found" });
  }

  const newBlog = new BlogModel({
    title,
    description,
    image,
    user,
  });
  try {
    // newBlog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    // add the blog post to the user collection
    exitUser.blogs.push(newBlog);
    await exitUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
  return res.status(200).json({ newBlog });
};

// deletig a blog post

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await BlogModel.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ msg: "Unable to delete blog post" });
  }

  return res.status(200).json({ msg: "Blog deleted successfull!" });
};

// update blog

export const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  let exitBlog;
  try {
    exitBlog = await BlogModel.findByIdAndUpdate(id, {
      title,
      description,
      image,
    });
  } catch (error) {
    console.log(error);
  }

  if (!exitBlog) {
    return res.status(404).json({ msg: "Blog not found" });
  }

  return res.status(200).json({ msg: "Blog updated successfull" });
};

// getting indivaul blog
export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  let exitBlog;
  try {
    exitBlog = await BlogModel.findById(id);
  } catch (error) {
    console.log(error);
  }

  if (!exitBlog) {
    return res.status(404).json({ msg: "Blog Post not found" });
  }

  return res.status(200).json({ blog: exitBlog });
};

// get each user blog post
export const allUserBlog = async (req, res, next) => {
  const { id } = req.params;
  let userBlogs;
  try {
      userBlogs = await UsersModel.findById(id).populate("blogs");
  } catch (error) {
      return console.log(error);
  }

  if (!userBlogs) {
      return res.status(404).json({msg: "No Blog Found"});
  }

  return res.status(200).json({blogs:userBlogs})
};
