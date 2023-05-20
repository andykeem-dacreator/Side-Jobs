const conn = require('./conn');
const { STRING, TEXT, UUID, UUIDV4, FLOAT, ENUM } = conn.Sequelize;

const Task = conn.define('task', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: TEXT,
  },
  description: {
    type: TEXT,
  },
  price: {
    type: FLOAT,
  },
  city: {
    type: TEXT,
  },
  state: {
    type: TEXT,
  },
  category: {
    type: ENUM(
      'virtual',
      'shopping',
      'misc',
      'moving',
      'sport',
      'gaming',
      'photography'
    ),
  },
  taskDoerId: {
    type: STRING,
  },
});

module.exports = Task;
