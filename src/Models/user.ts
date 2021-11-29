import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },

    notify: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            on: false,
            before: 0,
        },
    },
});

module.exports = mongoose.model("User", userSchema);
