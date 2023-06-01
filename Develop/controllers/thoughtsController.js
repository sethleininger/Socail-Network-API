const { User, Thoughts } = require('../models');

module.exports = {
    // gett all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);

        } catch (err) {
            console.log(err);
        }
    },
    // get thoughts by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: `No thought with that id`});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThoughts(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id }},
                { new: true }, 
            ) 

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId});

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id'});
            }

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought =  await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                .status(404)
                .json({ message: 'No thoughts with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body; 

            const thought = await Thoughts.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { 
                    reactions: { reactionBody, username }
                 },
                 $inc: {
                    reaction: 1
                 }
                 },
                { new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id'});
            }

        res.json(thought);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            const thought = await Thoughts.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { _id: reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id' });
            }

        res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}