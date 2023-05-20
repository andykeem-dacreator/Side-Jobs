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
  // userId: {
  //   type: STRING,//
  // },
  // taskId: {
  //   type: STRING//
  // },
  taskDoerId: {
    type: STRING //
  }
});

module.exports = Review;