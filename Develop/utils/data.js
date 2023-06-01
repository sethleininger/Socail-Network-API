const username = [
    'user123', 
    'coolguy87', 
    'username1', 
    'gamer345', 
    'happyuser', 
    'john_doe', 
    'user1234', 
    'musiclover', 
    'soccerfanatic', 
    'bookworm99', 
    'adventureseeker', 
    'codingwizard', 
    'naturelover', 
    'travelenthusiast', 
    'fitnessguru', 
    'moviebuff23',
    'foodie123', 
    'artlover77', 
    'fashionista88', 
    'techgeek42'

];



// const thoughts = [

// ];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUserName = () =>
`${getRandomArrItem(username)}`;


// const getRandomThoughts = 

module.exports = { getRandomUserName };