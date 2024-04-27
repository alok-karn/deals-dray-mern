import Layout from "@/components/Layout";
import { getUserDetails } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function DashBoard() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    let userName;
    let userRole;

    if (token) {
        userName = getUserDetails(token).name;
        userRole = getUserDetails(token).role;
    }

    if (userRole === "user") {
        return (
            <Layout>
                <div className="w-full h-[80vh] flex items-center justify-center">
                    <h1 className="text-[3vw] tracking-tight">
                        Welcome!{" "}
                        <span className="uppercase font-medium">
                            {userName}
                        </span>
                    </h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div>
                <h1 className="font-medium text-lg mt-2">Dashboard</h1>
                <h2 className="font-medium text-[3vw] mt-4 capitalize">
                    Welcome, Admin Panel
                </h2>
            </div>
        </Layout>
    );
}
