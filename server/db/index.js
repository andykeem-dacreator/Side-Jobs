const conn = require('./conn');
const User = require('./User');
const Task = require('./Task');
const { faker } = require('@faker-js/faker');
const Review = require('./Review');

//User.hasMany(Task);
User.hasMany(Task, { as: 'createdTasks', foreignKey: 'userId' });
User.hasMany(Task, { as: 'performedTasks', foreignKey: 'taskDoerId' });

Task.belongsTo(User, { as: 'taskCreator', foreignKey: 'userId' });
Task.belongsTo(User, { as: 'taskDoer', foreignKey: 'taskDoerId' });
//Review.belongsTo(User);
Review.belongsTo(User, { as: 'taskCreator', foreignKey: 'userId'});
Review.belongsTo(Task);

//User.hasMany(Review);
User.hasMany(Review);
Task.hasOne(Review);

const syncAndSeed = async () => {
  if (process.env.NO_SEED) {
    return;
  }


  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl, andy] = await Promise.all([

    User.create({
      username: 'moe',
      password: '123',
      firstName: 'Moe',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
      isAdmin: true,
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
      isAdmin: true,
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
      aboutMe: 'I am a jack of all trades, so I can handle pretty much whatever you throw at me, but I love cleaning and organizing the most!',
    }),
    User.create({
      username: 'andy',
      password: '123',
      firstName: 'Andy',
      lastName: 'The Greatest',
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
      isAdmin: true,
    })
 ]);


  const [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11 ] = await Promise.all([
    Task.create({
      title: 'Bring me a dozen eggs',
      description: 'Pick up a dozen eggs form the market and bring them to 123 Main St.',
      price: 15,
      city: 'New York',
      state: 'NY',
      category: 'shopping',
      userId: larry.id,
      taskDoerId: ethyl.id
    }),
    Task.create({
      title: 'Organize my calendar',
      description: 'Put important dates on my google calendar and organize it',
      price: 25,
      city: 'New York',
      state: 'NY',
      category: 'virtual',
      userId: ethyl.id,
      taskDoerId: larry.id
    }),
    Task.create({
      title: 'Walk the dog',
      description: 'Carry 500 lb dog down the stairs',
      price: 300,
      city: 'New York',
      state: 'NY',
      category: 'moving',
      userId: larry.id,
      taskDoerId: ethyl.id
    }),
    Task.create({
      title: '4th player needed for FortNite',
      description: 'FortNite took away trios so we need a 4th member for our team',
      price: 15,
      city: 'Los Angeles',
      state: 'CA',
      category: 'gaming',
      userId: larry.id,
      taskDoerId: ethyl.id
    }),
    Task.create({
      title: 'NEED HAIR PERSON',
      description: 'Have a wedding coming up TOMORROW and my hair person cancelled and need it done ASAP',
      price: 450,
      city: 'Colorado Springs',
      state: 'CO',
      category: 'beauty',
      userId: lucy.id,
      taskDoerId: ethyl.id
    }),
    Task.create({
      title: 'Party Entertainment',
      description: 'Need a professional dancing robot for upcoming Barmitzvah',
      price: 50,
      city: 'New York',
      state: 'NY',
      category: 'misc',
      userId: moe.id,
      taskDoerId: lucy.id
    }),
    Task.create({
      title: 'Last minute SAT tutor',
      description: 'My SAT exam is this Saturday and need tutoring ASAP',
      price: 45,
      city: 'New York',
      state: 'NY',
      category: 'virtual',
      userId: ethyl.id,
      taskDoerId: moe.id
    }),
    Task.create({
      title: 'Looking for housekeeping',
      description: 'I have an open house scheduled for next weekend and need someone to clean the house and prep it',
      price: 125,
      city: 'Phoenix',
      state: 'AZ',
      category: 'cleaning',
      userId: larry.id,
      taskDoerId: ethyl.id
    }),
    Task.create({
      title: 'Professional Blackjack Player assistance',
      description: 'I lost 10 thousand dollars and can not go home without some of it back. I have 15 dollars left.... please help me!',
      price: 15,
      city: 'Las Vegas',
      state: 'NV',
      category: 'misc',
      userId: moe.id,
      taskDoerId: lucy.id
    }),
    Task.create({
      title: 'Expand lemonade business',
      description: 'I run a successful lemonade stand business and looking to open another one down the block. I need help moving a small table and lemonade pitcher there.',
      price: 5,
      city: 'Miami',
      state: 'FL',
      category: 'moving',
      userId: andy.id,
      taskDoerId: lucy.id
    }),
    Task.create({
      title: 'Plus one for wedding',
      description: 'Just broke up with my gf and now need a new plus one for a wedding next month',
      price: 100,
      city: 'Philadelphia',
      state: 'PA',
      category: 'virtual',
      userId: larry.id,
      taskDoerId: lucy.id
    })
  ]);

  const [review1] = await Promise.all([
    Review.create({
      rating: 5,
      title: 'great job',
      comment: 'great job bringing the eggs on time',
      userId: larry.id,
      taskId: task1.id,
      taskDoerId: ethyl.id
    })
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
      andy
    },
    tasks: {
      task1,
      task2,
      task3,
      task4,
      task5,
      task6,
      task7,
      task8,
      task9,
      task10,
      task11
    },
    reviews: {
      review1,
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Task,
  Review
};
