import mongoose, { Schema, model } from "mongoose";

const WatchedFilmSchema = new Schema({
    slugifiedTitle: { type: String, required: true },
    rate: { type: Number },
    isLiked: { type: Boolean },
    watchedTimes: { type: Number },
    isWatchlisted: { type: Boolean }
});

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ],
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    photo: { type: String },
    givenName: { type: String },
    familyName: { type: String },
    location: { type: String },
    website: { type: String },
    bio: { type: String },
    pronoun: { type: String },
    posters: { type: String },
    replies: { type: String },
    includeToMembers: { type: Boolean },
    adultContents: { type: Boolean },
    watchedFilms: [WatchedFilmSchema]
},
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || model('User', UserSchema);
export default User;