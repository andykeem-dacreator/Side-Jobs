const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Message = conn.define('message', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  txt: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  toId: {
    type: UUID,
    allowNull: false,
  },
  fromId: {
    type: UUID,
    allowNull: false,
  },
  taskId: {
    type: UUID,
  },
});

module.exports = Message;
