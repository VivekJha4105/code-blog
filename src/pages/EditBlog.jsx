import { useEffect, useState } from "react";
import { BlogForm, Container } from "../Components/index";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";

function EditBlog() {
    const [blog, setBlog] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        if (slug) {
            appwriteService
                .getSingleBlog(slug)
                .then((blog) => {
                    if (blog) setBlog(blog);
                })
                .catch((error) => {
                    setError(error?.message);
                });
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Container>
                {blog ? (
                    <BlogForm blog={blog} />
                ) : error ? (
                    <p className="text-xl md:text-2xl p-2 rounded-lg text-red-500 shadow-md font-semibold ">
                        {error}
                    </p>
                ) : null}
            </Container>
        </div>
    );
}

export default EditBlog;
