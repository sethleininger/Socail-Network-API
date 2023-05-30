const { Schema } = require('mongoose');

const reactionsSchema = new Schema(
    {
        reactionId : {
            type: [
                // HELP is this right?
            {
                type: Schema.Types.ObjectId,
                ref: 'newReaction',
                default: function() {
                    return new Schema.Types.ObjectId(); 
                }, 
            },
            ],
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        }, 
        createdAt: {
             type: Date,
             default: Date.now,
            //  is this right? 
             get: function (createdAt) {
                return createdAt.toLocaleString();
             }
        },
        reactionCount: [
            {
                type: Number,
                ref: 'reactionCount'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);
// is this right?
reactionsSchema.virtual('count').get(function () {
    return this.reactionCount.length;
});

// const Reactions = model('reactions', reactionsSchema);

module.exports = reactionSchema;