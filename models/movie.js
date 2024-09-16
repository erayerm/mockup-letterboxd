import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true },
    date: { type: String, required: true },
    directors: [{ type: String }],
    tagline: { type: String },
    description: { type: String },
    castID: [{ type: Number }],
    crewID: [{ type: Number }],
    details: {
        studios: [{ type: String }],
        countries: [{ type: String }],
        languages: [{ type: String }],
        alternativeTitles: [{ type: String }]
    },
    length: { type: Number },
    watched: { type: Number },
    listAppear: { type: Number },
    favorited: { type: Number },
    whereToWatch: [{
        platform: { type: String },
        options: [{
            type: { type: String },
            link: { type: String }
        }]
    }],
    genreIDs: [{ type: Number }],
    themes: [{ type: Number }],
}, { timestamps: true });

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;