import { Employee } from "@/models/Employee";
import { mongooseConnect } from "@/utils/mongoose";

async function searchInDataBase(query) {
    try {
        const searchResults = await Employee.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { mobile: { $regex: query, $options: "i" } },
                { designation: { $regex: query, $options: "i" } },
            ],
        }).exec();
        return searchResults;
    } catch (error) {
        throw new Error("Error searching in database: " + error.message);
    }
}

export default async function handle(req, res) {
    await mongooseConnect();
    const { q } = req.query;

    try {
        const searchResult = await searchInDataBase(q);
        return res.status(200).json({
            success: true,
            data: searchResult,
        });
    } catch (error) {
        console.error("Error searching:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
