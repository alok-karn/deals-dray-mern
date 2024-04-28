import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Login from "@/pages/login";
import Register from "@/pages/register";

export default function Layout({ children }) {
    const [session, setSession] = useState(false);
    const [option, setOption] = useState("login");

    useEffect(() => {
        // Check for token in localStorage when component mounts
        const token = localStorage.getItem("token");
        if (token) {
            setSession(true);
        } else {
            setSession(false);
        }
    }, []);

    if (!session) {
        return (
            <div className="w-full h-screen px-20">
                <div className="w-full pt-6 flex items-center gap-10">
                    {["Login", "Register"].map((item, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-md font-[500] ${
                                option === item.toLowerCase()
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => setOption(item.toLowerCase())}>
                            {item}
                        </button>
                    ))}
                </div>
                {
                    {
                        login: <Login />,
                        register: <Register />,
                    }[option]
                }
            </div>
        );
    }

    return (
        <div className="w-full h-screen px-20">
            <NavBar />
            {children}
        </div>
    );
}
