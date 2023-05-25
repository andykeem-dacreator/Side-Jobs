const conn = require('./conn');
const { STRING, TEXT, UUID, UUIDV4, INTEGER } = conn.Sequelize;

const Review = conn.define('review', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  rating: {
    type: INTEGER,
  },
  title: {
    type: STRING,
  },
  comment: {
    type: TEXT,
  },
  // taskDoerId: {
  //   type: STRING
  // }
  userId: {
    type: UUID
  },
  taskId: {
    type: UUID,
    //allowNull: false,
    references: {
      model: 'tasks',
      key: 'id',
    }
  },
  taskDoerId: {
    type: UUID,
    //allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
} , {
  indexes: [
    {
      unique: true,
      fields: ['taskId', 'taskDoerId'],
    },
  ]
});

module.exports = Review;