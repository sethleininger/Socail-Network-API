const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;