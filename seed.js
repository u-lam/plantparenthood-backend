const db = require('./models');
const bcrypt = require('bcryptjs');


const users = [
  {
  firstName: 'Teddy',
  lastName: 'Lam',
  email: 'pop@pops.com',
  password: '123',
}
];

const plants = [
  {
    name: "Aloe",
    sunlight: "6 hrs",
    water: "Every 2 weeks",
  },
  {
    name: "Vera",
    sunlight: "8 hrs",
    water: "Once a week",

  },
  {
    name: "Sunshine",
    sunlight: "12",
    water: "Every week",
  },
  {
    name: "Spooks",
    sunlight: "4 hrs",
    water: "Every 2 weeks",
  }
];


db.User.deleteMany({}, (err, newUsers) => {
  if (err) console.log(err)
  console.log('removed all users');
  db.User.insertMany(users, (err, newUsers) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    console.log('added new users');
  });
});


db.Plant.deleteMany({}, (err, newPlants) => {
  if (err) console.log(err)
  console.log('removed all plants');
  db.Plant.insertMany(plants, (err, newPlants) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    console.log('added new plants');
  })
})
