const { Schema, models, model } = require("mongoose");

const LoginSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

export const Login = models.Login || model("Login", LoginSchema);
