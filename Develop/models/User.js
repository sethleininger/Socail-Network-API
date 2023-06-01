const { Schema, model} = require('mongoose');
// const thoughtsSchema = require('./Thoughts');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
         email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: 
        [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            }
        ],
        friends: 
        [
            {
              type: Schema.Types.ObjectId,
              ref: 'User', 
            }
        ],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

//  is this right?
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;