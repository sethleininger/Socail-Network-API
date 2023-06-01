
const { User } = require('../models');


module.exports = {
    //  get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');

            const userObj = {
                users,
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }, 
// Help on populating friends and thoughts
// get single user and their firends and thoughts
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v').populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user with that id'})
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such student exists' });
            }
            res.json({ message: 'User successfully deleted!'});
         } catch (err) {
            console.log(err);
            res.status(500).json(err);
         }

    },


    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'No user with this id!' });
            }

            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
    async createFriend(req, res) {
    try {
        const userFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        ).populate('thoughts').populate('friends');

        res.json({ message: 'Friend created within user!', userFriend });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndRemove({ _id: req.params.friendId });

        if (!friend) {
            return res.status(404).json({ message: 'No friend with that id!'});
        }

        const userFriend = await User.findOneAndUpdate(
            { friends: req.params.friendId },
            { $pull: {friends: req.params.friendId} },
            { new: true } 
        );

        res.json({ message: 'Friend sucessfully deleted from User'})
        res,json(userFriend);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } 

}; 