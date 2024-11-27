import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { Container } from "../Components/index";
import appwriteService from "../appwrite/conf";

function Blog() {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    //! Even if there is no user logged in...isAuthor would be false.
    const isAuthor = blog && userData ? userData?.$id === blog?.$id : false;

    useEffect(() => {
        setError("");

        if (slug) {
            appwriteService
                .getSingleBlog(slug)
                .then((blogResponse) => {
                    if (blogResponse) {
                        setBlog(blogResponse);
                    }
                })
                .catch((error) => setError(error?.message));
        }
    }, [slug]);

    const deleteBlog = () => {
        appwriteService.deleteBlog(blog?.$id).then((res) => {
            if (res) {
                appwriteService.deleteFile(blog?.image);
                navigate("/");
            }
        });
    };

    return blog ? (
        <section>
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 md:p-4">
                    <img
                        src={appwriteService.getFilePreview(blog?.$image)}
                        alt={blog?.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-blog/${blog?.$id}`}>
                                <button className="p-2 md:px-5 py-3 font-semibold duration-200 shadow-lg bg-blue-500 text-white hover:bg-slate-800 hover:text-white cursor-pointer">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={deleteBlog}
                                className="p-2 md:px-5 py-3 font-semibold duration-200 shadow-lg bg-red-500 text-white hover:bg-slate-800 hover:text-white cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-4 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                        {blog?.title}
                    </h2>
                </div>
                <div className="">{parse(blog?.content)}</div>
            </Container>
        </section>
    ) : null;
}

export default Blog;
