import { useRouter } from "next/router";

export default function Unauthorized() {
    const router = useRouter();
    const handleBack = () => {
        router.push("/dashboard");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">
            <h1 className="text-lg font-bold text-gray-800">Unauthorized</h1>
            <p>You are not authorized to view this page</p>
            <button
                className="bg-gray-200 text-gray-900 px-4 py-2 mt-4 font-medium rounded-md"
                onClick={handleBack}>
                Back to Dashboard
            </button>
        </div>
    );
}
