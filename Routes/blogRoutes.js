import express from "express";
import { getAllBlogs, addBlog, deleteBlog, updateBlog, getBlogById, allUserBlog } from "../Controllers/blogController";

const blogRoutes = express.Router();

blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.post("/add", addBlog);
blogRoutes.delete("/remove/:id", deleteBlog);
blogRoutes.put("/update/:id", updateBlog);
blogRoutes.get("/user/:id", allUserBlog);

export default blogRoutes;
