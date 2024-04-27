const { Schema, models, model } = require("mongoose");

const EmployeeSchema = new Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },
        course: [
            {
                type: String,
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const Employee = models.Employee || model("Employee", EmployeeSchema);
