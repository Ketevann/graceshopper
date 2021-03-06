'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')



module.exports = (db) => db.define('payment', {
  vendor: {
    type: Sequelize.ENUM('MasterCard', 'Visa', 'American Express', 'Discover'),
    allowNull: false
  },
  ExpirationDate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  CCV: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Number: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   len: [13]
    // }
  },
  Name: {
    type: Sequelize.STRING,
  },
  Street: {
    type: Sequelize.STRING,
  },
  Apartment: {
    type: Sequelize.STRING,
  },
  State: {
    type: Sequelize.ENUM('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode')
  },
  City: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER
  },
})


module.exports.associations = (Payment, {Order, User}) => {
  Payment.belongsTo(Order)
  Payment.belongsTo(User)
}
