import { Login } from "@/models/Login";
import { mongooseConnect } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "POST") {
        const { name, password } = req.body;
        try {
            const user = await Login.findOne({ name });
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: "User does not exist" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ success: false, error: "Invalid password" });
            }

            // if everything is fine, generate a token

            const token = jwt.sign(
                { userId: user._id, name: user.name, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({ success: true, data: user, token });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Internal Server Error",
            });
        }
    }
}
