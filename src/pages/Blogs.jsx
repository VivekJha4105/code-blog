import { useState } from "react";
import appwriteService from "../appwrite/conf";
import { Container, BlogCard } from "../Components/index";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        appwriteService
            .getAllBlogs([])
            .then((blogs) => {
                if (blogs) setBlogs(blogs.documents);
            })
            .catch((error) => setError(error?.message))
            .finally(setLoading(false));
    }, []);

    if (loading) {
        return (
            <section>
                <Container>
                    <h1 className="text-2xl md:text-3xl p-2 rounded-lg shadow-md font-semibold ">
                        Loaind..
                    </h1>
                </Container>
            </section>
        );
    }

    return (
        <section>
            <Container>
                <div className="flex flex-wrap gap-4">
                    {blogs.length
                        ? blogs.map((blog) => (
                              <div className="w-1/4 p-2">
                                  <BlogCard
                                      key={blog?.$id}
                                      title={blog?.title}
                                      image={blog?.image}
                                  />
                              </div>
                          ))
                        : error && (
                              <p className="text-xl md:text-2xl p-2 rounded-lg text-red-500 shadow-md font-semibold ">
                                  {error}
                              </p>
                          )}
                </div>
            </Container>
        </section>
    );
}

export default Blogs;
