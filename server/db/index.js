const conn = require('./conn');
const User = require('./User');
const Task = require('./Task');
const { faker } = require('@faker-js/faker');

User.hasMany(Task);
Task.belongsTo(User);

const syncAndSeed = async () => {
  if (process.env.NO_SEED) {
    return;
  }
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: 'moe',
      password: '123',
      firstName: 'Moe',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
    User.create({
      username: 'lucy',
      password: '123',
      firstName: 'Lucy',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
    User.create({
      username: 'larry',
      password: '123',
      firstName: 'Larry',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
    User.create({
      username: 'ethyl',
      password: '123',
      firstName: 'Ethyl',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Task,
};
