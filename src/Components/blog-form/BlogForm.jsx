import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RichTextEditor, InputField, SelectField } from "../index";
import appwriteService from "../../appwrite/conf";
import { useCallback, useEffect } from "react";

function BlogForm({ blog }) {
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: blog?.title || "",
                slug: blog?.slug || "",
                content: blog?.content || "",
                status: blog?.status || "active",
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (blog) {
            const file = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            if (file) {
                await appwriteService.deleteFile(blog?.image);
            }

            const updatedBlog = await appwriteService.updateBlog(blog?.$id, {
                ...data,
                image: file ? file?.$id : null,
            });

            if (updatedBlog) {
                navigate(`/blog/${updatedBlog?.$id}`);
            }
        } else {
            const file = data?.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;
            if (file) {
                const createdBlog = await appwriteService.createBlog({
                    ...data,
                    image: file?.$id,
                    author: userData?.$id,
                });

                if (createdBlog) {
                    navigate(`/blog/${createdBlog?.$id}`);
                }
            }
        }
    };

    const slugFormation = useCallback((value) => {
        if (value.length && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == "title") {
                setValue(
                    "slug",
                    slugFormation(value?.title, {
                        shouldValidate: true,
                    })
                );
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, slugFormation]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 p-2 space-y-4">
                <InputField
                    label="Title: "
                    type="string"
                    {...register("title", { required: true })}
                />
                <InputField
                    label="Slug"
                    type="string"
                    {...register("slug", { required: true })}
                    //! Cant understand the below method process
                    onInput={(e) => {
                        setValue("slug", slugFormation(e.target.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RichTextEditor
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues(content)}
                />
            </div>
            <div className="w-1/3 p-2 space-y-4">
                <InputField
                    label="Image: "
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !blog })}
                />
                {blog && (
                    <div className="w-full">
                        <img
                            src={appwriteService.getFilePreview(blog.image)}
                            alt={blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <SelectField
                    label="Status: "
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />

                <button
                    type="submit"
                    className="p-2 md:px-5 py-3 font-semibold duration-200 shadow-lg bg-slate-600 text-white hover:bg-slate-800 cursor-pointer"
                >
                    {blog ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}

export default BlogForm;
