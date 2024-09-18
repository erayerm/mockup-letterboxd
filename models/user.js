import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        photo: { type: String, required: true },
        username: { type: String, required: true },
        givenName: { type: String, required: true },
        familyName: { type: String, required: false },
        location: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;