import { Link } from "react-router-dom";
import appwriteServices from "../appwrite/conf";

const BlogCard = ({ $id, title, image }) => {
    return (
        <Link to={`/blog/${$id}`}>
            <div className="w-full bg-slate-600 rounded-xl p-2 md:p-4">
                <div className="w-full mb-4">
                    <img
                        className="rounded-xl"
                        src={appwriteServices.getFilePreview(image)}
                        alt={title}
                    />

                    <h2 className="text-white/60 text-xl md:text-2xl tracking-tight font-semibold">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
