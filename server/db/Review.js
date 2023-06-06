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
    allowNull: false,
  },
  title: {
    type: STRING,
  },
  comment: {
    type: TEXT,
  },
  taskDoerId: {
    type: UUID
  },
  taskId: {
    type: UUID,
    allowNull: false,
    unique: true
  }
}
// , {
//   indexes: [
//     {
//       unique: true,
//       fields: ['taskId']
//     }
//   ],
//   validate: {
//     async uniqueReviewPerTask() {
//       const existingReview = await Review.findOne({
//           where: {
//             taskId: this.taskId
//           }
//         });
//     }
//   }
// }
);

module.exports = Review;