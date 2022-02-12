import mongoose from "mongoose";

const articleSchema = {
    title: String,
    content: String,
};

export default mongoose.model("Article", articleSchema);