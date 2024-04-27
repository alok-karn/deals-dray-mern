import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [vPassword, setVPassword] = useState("");

    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Name: ", name);
        console.log("Password", password);

        if (!name || !password) {
            alert("Please fill all the fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            // alert("Password must be at least 6 characters long");
            return;
        }

        if (password !== vPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/auth/register", {
                name,
                password,
            });

            if (response.data.success) {
                alert("User registered successfully");

                // redirect user to login
                router.push("/login");
                setError(null);
            }
        } catch (error) {
            setError(error.response.data.error);
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="w-full h-screen py-8 px-20">
            <h1 className="text-[3vw] font-bold text-gray-900">Register</h1>
            <form
                className="flex flex-col w-auto gap-2 mt-8 items-center justify-center"
                onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-4">
                    <label
                        htmlFor="name"
                        className="font-bold text-gray-900 text-[1.3vw]">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`border-2 px-4 py-2 w-[30vw] rounded-md focus:outline-blue-300 ${
                            error ? "border-red-400" : ""
                        }`}
                    />
                </div>
                <div className="flex items-start flex-col gap-4 mt-4">
                    <label
                        htmlFor="password"
                        className="font-bold text-gray-900 text-[1.3vw]">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border-2 px-4 py-2 w-[30vw] rounded-md ${
                            error ? "border-red-400" : ""
                        } focus:outline-blue-300`}
                    />
                    {error && (
                        <p className="text-red-500 font-bold text-[14px]">
                            {error}
                        </p>
                    )}
                </div>
                <div className="flex items-start flex-col gap-4 mt-4">
                    <label
                        htmlFor="password"
                        className="font-bold text-gray-900 text-[1.3vw]">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={vPassword}
                        required
                        onChange={(e) => setVPassword(e.target.value)}
                        className={`border-2 px-4 py-2 w-[30vw] rounded-md ${
                            error ? "border-red-400" : ""
                        } focus:outline-blue-300`}
                    />
                    {error && (
                        <p className="text-red-500 font-bold text-[14px]">
                            {error}
                        </p>
                    )}
                </div>
                <button className="px-4 py-2 font-medium text-lg uppercase bg-blue-400 rounded-md text-gray-100 mt-6 hover:bg-blue-500">
                    signup
                </button>
            </form>
        </div>
    );
}
