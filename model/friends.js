const repo = require("mongoose");

const friendSchema = new repo.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
        trim: true,
        maxlength: [50, "name cannot be greater than 50 characters"]
    },
    slug: String,
    userId: Number,
    website: { type: String },
    priority: {
        type: Number,
        min: [1, "Min 1"],
        max: [10, "Max 10"]

    }

});

module.exports = repo.model('Friend', friendSchema);