import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
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

        try {
            const response = await axios.post("/api/auth/login", {
                name,
                password,
            });
            console.log("Response", response);

            const { success, token } = response.data;

            if (success) {
                alert("User logged in successfully");
                localStorage.setItem("token", token);
                router.push("/dashboard");
                setError(null);
            } else {
                alert("Invalid credentials");
                setError(response.data.error);
            }
        } catch (error) {
            alert("Login error:", error.response.data.error);
            setError(error.response.data.error);
            // setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="w-full h-screen py-8 px-20">
            <h1 className="text-[3vw] font-bold text-gray-900">Login</h1>
            <form
                className="flex flex-col w-auto gap-2 mt-8 items-center justify-center"
                onSubmit={handleLogin}>
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
                <button className="px-4 py-2 font-medium text-lg uppercase bg-blue-400 rounded-md text-gray-100 mt-6 hover:bg-blue-500">
                    login
                </button>
            </form>
        </div>
    );
}
