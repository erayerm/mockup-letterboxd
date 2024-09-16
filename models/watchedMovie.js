import mongoose, { Schema } from "mongoose";

const watchedMovieSchema = new Schema({
    userID: { type: String, required: true },
    movieID: { type: String, required: true },
    rate: { type: Number, required: true },
    isLiked: { type: Boolean, required: true },
    watchedTimes: { type: Number, required: true }
});

const WatchedMovies = mongoose.models.WatchedMovies || mongoose.model("WatchedMovies", watchedMovieSchema);

export default WatchedMovies;