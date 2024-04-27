import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default function NavBar() {
    // const userName = "Alok";
    const router = useRouter();

    const userName = jwt.decode(localStorage.getItem("token")).name;

    const handleLogout = () => {
        localStorage.removeItem("token");
        // window.location.href = "/";
        router.push("/");
    };

    return (
        <div className="w-full py-4 bg-white flex justify-between items-center">
            <div className="logo font-bold">LOGO</div>
            {["Home", "Employee List", `${userName}`, "Logout"].map(
                (item, index) =>
                    index === 3 ? (
                        <button
                            key={index}
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold">
                            {item}
                        </button>
                    ) : index === 2 ? (
                        <div key={index} className="flex items-center">
                            <span className=" font-bold text-gray-700 uppercase">
                                {item}
                            </span>
                        </div>
                    ) : (
                        <Link
                            key={index}
                            className="hover:border-b-2 text-lg font-[400] tracking-normal"
                            href={` ${
                                index === 0
                                    ? "/dashboard"
                                    : `${item.toLowerCase().replace(" ", "-")}`
                            } `}>
                            {item}
                        </Link>
                    )
            )}
        </div>
    );
}
