'use strict';
var Sequelize = require('sequelize')
var db = require('./index.js');

module.exports = (db) => db.define('reviews', {
    content: {
        type: Sequelize.TEXT,

    },
    stars: {
        type: Sequelize.FLOAT
        // validate: {
        //     min: 0,
        //     max: 5
        // }
    },
})

module.exports.associations = (Review, {Product, User}) => {
  Review.belongsTo(Product)
  Review.belongsTo(User)
}
