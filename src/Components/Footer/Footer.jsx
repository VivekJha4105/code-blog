import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
    return (
        <section className="relative w-full border-t-2 border-t-slate-700 overflow-hidden">
            <div className="mx-auto relative z-10 px-4">
                <div className="flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-5/12">
                        <div className="w-full h-full flex flex-col justify-between text-slate-700">
                            <div className="items-center inline-flex">
                                <div className="w-28 text-white font-extrabold text-md">
                                    <Logo width="100px" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-300 hover:text-white">
                                &copy; Copywrite 2024. All Rights are Reserved
                                by{" "}
                                <span className="tracking-tight text-md text-green-500 font-bold mt-1">
                                    CodeBlog
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full p-4 ml-4 md:w-1/2 lg:w-3/12">
                        <div className="flex flex-col justify-between gap-4">
                            <h4 className="tracking-tight text-xs font-semibold uppercase text-slate-800">
                                Company
                            </h4>
                            <ul>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./"}>Features</Link>
                                </li>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./cources"}>Pricing</Link>
                                </li>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./programs"}>
                                        Affiliated Program
                                    </Link>
                                </li>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./letter"}>Press Letter</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 ml-4 md:w-1/2 lg:w-3/12">
                        <div className="flex flex-col justify-between gap-4">
                            <h4 className="tracking-tight text-xs font-semibold uppercase text-slate-800">
                                Support
                            </h4>
                            <ul>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./"}>Account</Link>
                                </li>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./cources"}>Help</Link>
                                </li>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./programs"}>Contact Us</Link>
                                </li>
                                <li className="text-xs p-2 rounded-md text-slate-300 hover:bg-slate-800">
                                    <Link to={"./letter"}>Further Support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
