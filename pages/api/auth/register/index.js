import { Login } from "@/models/Login";
import { mongooseConnect } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "POST") {
        const { name, password } = req.body;

        try {
            const existingUser = await Login.findOne({ name });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ success: false, error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new Login({
                name,
                password: hashedPassword,
                role: `${name === "admin" ? "admin" : "user"}`,
            });

            const data = await user.save();
            res.status(201).json({ success: true, data: data });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}
