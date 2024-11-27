import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { BlogCard, Container } from "../Components/index";
import { Link } from "react-router-dom";

function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        appwriteService.getAllBlogs().then((blogs) => {
            if (blogs) {
                setBlogs(blogs.documents);
            }
        });
    }, []);

    if (blogs.length == 0) {
        return (
            <section className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="w-full p-2">
                            <h3 className="text-xl md:text-2xl font-semibold text-slate-600">
                                No Blogs to Read.{" "}
                                <span className="text-blue-500 cursor-pointer hover:text-blue-600 duration-200">
                                    <Link to={"/login"}>Login</Link>
                                </span>{" "}
                                and get access to blogs.
                            </h3>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
    return (
        <section className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap gap-2">
                    {blogs.map((blog) => {
                        <div key={blog?.$id} className="w-1/4 p-2">
                            <BlogCard
                                key={blog?.$id}
                                title={blog?.title}
                                image={blog?.image}
                            />
                        </div>;
                    })}
                </div>
            </Container>
        </section>
    );
}

export default Home;
