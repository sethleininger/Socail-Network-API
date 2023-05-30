// const connection = require('../config/connection');
// const { User, Thoughts } = require('../models');
// const { getRandomUserName } = require('./data');

// connection.on('error' (err) => err);

// connection.once('open', async () => {
//     console.log('connected');

//     // drop existing users
//     await User.deleteMany({});

//     // drop existing s

//     const users = [];

//     for (let i = 0; i < 20; i++) {

//         const userName = getRandomUserName();
//         const email = `${userName}@example.com`;

//         users.push({
//             userName,
//             email,
//         });

//     }

//     await User.collection.insertMany(users);

//     console.log(users);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);

// });

const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomUserName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});
  // Drop existing thoughts
  await Thoughts.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const userName = getRandomUserName();
    const email = `${userName}@example.com`;

    const user = await User.create({ userName, email });

    // Generate thoughts for each user
    const numThoughts = Math.floor(Math.random() * 10) + 1; // Random number of thoughts per user (1 to 10)
    for (let j = 0; j < numThoughts; j++) {
      const thoughtText = `Thought ${j + 1} by ${userName}`;
      const thought = await Thoughts.create(
        { thoughtText, 
        username: userName,
        userId: user._id,
         });

      // Associate the thought with the user
      user.thoughts.push(thought);
      await user.save();
    }

    users.push(user);
  }

  console.log(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
