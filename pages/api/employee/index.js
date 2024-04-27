import { Employee } from "@/models/Employee";
import { mongooseConnect } from "@/utils/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "POST") {
        const { name, email, mobile, designation, gender, course, image } =
            req.body;

        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }

        if (
            !name ||
            !email ||
            !mobile ||
            !designation ||
            !gender ||
            !course ||
            !image
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        try {
            const newEmployee = new Employee({
                imageUrl: image,
                name,
                email,
                mobile,
                designation,
                gender,
                course,
            });
            const savedEmployee = await newEmployee.save();
            return res.status(201).json({
                success: true,
                data: savedEmployee,
                message: "User created successfully!",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // Get all employees

    if (method === "GET") {
        try {
            const employees = await Employee.find();
            return res.status(200).json({ success: true, data: employees });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // delete employee

    if (method === "DELETE") {
        const { id } = req.query;
        try {
            const data = await Employee.findByIdAndDelete(id);
            res.status(200).json({
                success: true,
                data: data,
                msg: "Employee deleted",
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "No Employee found with that id",
            });
        }
    }

    // Update employee

    if (method === "PUT") {
        const { _id, name, email, mobile, designation, gender, course, image } =
            req.body;

        try {
            const data = await Employee.findByIdAndUpdate(_id, {
                imageUrl: image,
                name,
                email,
                mobile,
                designation,
                course,
                gender,
            });
            res.status(200).json({
                success: true,
                data: data,
                msg: "Employee updated",
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "No Employee found with that id",
            });
        }
    }
}
