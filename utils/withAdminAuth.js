import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUserDetails } from "./utils";

export const withAdminAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const role = getUserDetails(token).role;
                if (role !== "admin") {
                    router.push("/unauthorized");
                }
            } catch (error) {
                console.error("Token verification failed", error);
                router.push("/login");
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
    return Wrapper;
};
