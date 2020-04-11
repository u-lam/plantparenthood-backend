const db = require('./models');
const bcrypt = require('bcryptjs');


const users = [
  {
  firstName: 'testing',
  lastName: 'testers',
  email: 'test@test.com',
  password: '1234',
  location: 'sf'
}
];

const plants = [
  {
    name: "Aloe",
    sunlight: "6 hrs a day",
    water: "Every 2 weeks"
  },
  {
    name: "Vera",
    sunlight: "8 hrs a day",
    water: "Once a week"
  },
  {
    name: "Cactus",
    sunlight: "12 hrs a day",
    water: "Once a month"
  }
]

const seedUsers = async (req, res) => {
  try {
    await db.User.deleteMany({});
    console.log('Deleted all users..');

    let user;
    for (user of users) {
      const hashPwd = await bcrypt.hash(user.password, 10);
      user.password = hashPwd;
      user = await db.User.create(user);
    };
    console.log('Seeded users...');
    return user._id;
  } catch (err) {
    console.log('Exiting...');
    process.exit();
  };
};


const seedPlants = async () => {
  try {
    let userId = await seedUsers();
    plants.forEach(plant => plant.user = userId);
    await db.Plant.deleteMany({});
    console.log('Deleted all plants...');
    let createPlants = await db.Plant.create(plants);
    console.log(`Created ${createPlants.length} plants. Exiting...`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(0);
  };
};

seedUsers();
seedPlants();