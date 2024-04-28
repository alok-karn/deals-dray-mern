import { storage } from "@/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { set } from "mongoose";
import { useState } from "react";

const EmployeeForm = ({
    _id,
    name: existingName,
    email: existingEmail,
    mobile: existingMobile,
    designation: existingDesignation,
    gender: existingGender,
    course: existingCourse,
    image: existingImage,
}) => {
    const [name, setName] = useState(existingName || "");
    const [email, setEmail] = useState(existingEmail || "");
    const [mobile, setMobile] = useState(existingMobile || "");
    const [designation, setDesignation] = useState(existingDesignation || "");
    const [gender, setGender] = useState(existingGender || "");
    const [course, setCourse] = useState(existingCourse || []);
    const [image, setImage] = useState(existingImage || "");
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");

    const [ID, setID] = useState(_id || "");

    const handleCourseChange = (e) => {
        const { value } = e.target;
        if (course.includes(value)) {
            setCourse(course.filter((item) => item !== value));
        } else {
            setCourse([...course, value]);
        }
    };

    function handleImagePreview(e) {
        const file = e.target.files[0];
        console.log(file);

        if (file) {
            const allowedExtension = /\.(jpg|jpeg|png)$/i;
            if (file.size > 0) {
                if (allowedExtension.test(file.name)) {
                    setImage(file);
                    const preview = URL.createObjectURL(file);
                    setImagePreview(preview);
                } else {
                    console.log(
                        `File "${file.name}" is not a valid image file`
                    );
                }
            } else {
                console.log(`File "${file.name}" is empty`);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || image.length === 0) {
            setError("Please upload an image");
            return;
        }

        let downloadURL = "";

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        try {
            const snapshot = await uploadTask;
            downloadURL = await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Error uploading image", error);
        }

        const formData = {
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image: downloadURL,
        };

        try {
            if (_id) {
                const { data } = await axios.put(`/api/employee/`, {
                    ...formData,
                    _id: ID,
                });

                if (data.success) {
                    alert("Employee updated successfully!");
                    console.log("Employee updated successfully!");

                    setName("");
                    setEmail("");
                    setMobile("");
                    setDesignation("");
                    setGender("");
                    setCourse([]);
                    setImage("");
                    setImagePreview("");
                    setError("");
                    setID("");
                }
            }
        } catch (error) {
            setError(error.response.data.message || "Error updating employee");
            console.error("Error updating employee", error);
        }

        try {
            const { data } = await axios.post("/api/employee", formData);
            if (data.success) {
                alert("Employee created successfully!");
                console.log("Employee created successfully!");

                setName("");
                setEmail("");
                setMobile("");
                setDesignation("");
                setGender("");
                setCourse([]);
                setImage("");
                setImagePreview("");
                setError("");
                setID("");
            }
        } catch (error) {
            // alert(error.response.data.message || "Error creating employee");

            setError(error.response.data.message || "Error creating employee");
            console.error("Error creating employee", error);
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-[2vw] font-medium">Create Employee</h1>
            </div>
            <form className="mt-4 w-full h-auto flex" onSubmit={handleSubmit}>
                <div className="left w-1/2">
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="name"
                            className="text-[1.3vw] font-bold ">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 px-4 py-2 w-[30vw] rounded-md"
                        />
                    </div>
                    <div className="flex flex-col items-start mt-4">
                        <label
                            htmlFor="email"
                            className="text-[1.3vw] font-bold ">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 px-4 py-2 w-[30vw] rounded-md"
                        />
                    </div>
                    <div className="flex flex-col items-start mt-4">
                        <label
                            htmlFor="phone"
                            className="text-[1.3vw] font-bold ">
                            Mobile no
                        </label>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="border-2 px-4 py-2 w-[30vw] rounded-md"
                        />
                    </div>
                    <div className="w-[100%] h-auto flex gap-4">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt={`Uploaded Image `}
                                className="object-cover w-10 h-12 rounded-md"
                            />
                        )}
                    </div>
                    <label className="mt-6 w-[30vw] h-[200px] border-dotted border-2 py-12 px-4 flex flex-col gap-2 items-center hover:cursor-pointer rounded-2xl">
                        <h2 className="font-bold text-gray-800">
                            Upload image
                        </h2>
                        <p className="font-semibold text-gray-600 text-sm">
                            Please provide at least one clear photo of the
                            Employee.
                        </p>
                        <input
                            type="file"
                            className="hidden"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleImagePreview}
                        />
                        <div className="w-[100px] p-2 bg-gray-200 text-center font-bold text-gray-700 text-sm rounded-md hover:bg-slate-200">
                            Add Image
                        </div>
                    </label>
                </div>
                <div className="right w-1/2">
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="designation"
                            className="text-[1.3vw] font-bold ">
                            Designation
                        </label>
                        {/* dropdown */}
                        <select
                            name="designation"
                            id="designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="border-2 px-4 py-2 w-[30vw] rounded-md">
                            <option value="">Select Designation</option>
                            {["HR", "Manager", "Sales"].map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col items-start mt-4">
                        <label
                            htmlFor="gender"
                            className="text-[1.3vw] font-bold ">
                            Gender
                        </label>
                        {/* radio */}
                        <div className="flex items-center gap-4 text-lg font-medium">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)}
                            />{" "}
                            Male
                        </div>
                        <div className="flex items-center gap-4 text-lg font-medium">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />{" "}
                            Female
                        </div>
                    </div>
                    {/* course */}
                    <div className="flex flex-col items-start mt-4">
                        <label
                            htmlFor="course"
                            className="text-[1.3vw] font-bold ">
                            Course
                        </label>

                        {["MCA", "BCA", "BSC"].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 text-lg font-medium">
                                <input
                                    type="checkbox"
                                    name="course"
                                    value={item}
                                    checked={course.includes(item)}
                                    onChange={handleCourseChange}
                                />{" "}
                                {item}
                            </div>
                        ))}
                    </div>
                    <button
                        className={`px-4 py-2 font-medium text-lg capitalize rounded-md text-gray-100 mt-6  ${
                            ID
                                ? "bg-green-400 hover:bg-green-500"
                                : "bg-blue-400 hover:bg-blue-500"
                        }`}
                        type="submit">
                        {ID ? "Update Employee" : "Create Employee"}
                    </button>
                    {error && (
                        <div className="mt-4 text-red-600 font-bold">
                            {error}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
