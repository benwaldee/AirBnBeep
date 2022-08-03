'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Bon',
        email: 'johnbohn@gmail.com',
        username: 'johnbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Mark',
        lastName: 'Bon',
        email: 'markbohn@gmail.com',
        username: 'markbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Adam',
        lastName: 'Bon',
        email: 'adambohn@gmail.com',
        username: 'adambon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Joe',
        lastName: 'Bon',
        email: 'joebohn@gmail.com',
        username: 'joebon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Drew',
        lastName: 'Bon',
        email: 'drewbohn@gmail.com',
        username: 'drewbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Daniel',
        lastName: 'Bon',
        email: 'danielbohn@gmail.com',
        username: 'danielbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'JB',
        lastName: 'Bon',
        email: 'JBbohn@gmail.com',
        username: 'JBbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Ben',
        lastName: 'Bon',
        email: 'benbohn@gmail.com',
        username: 'benbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Jordan',
        lastName: 'Bon',
        email: 'jordanbohn@gmail.com',
        username: 'jordanbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
      {
        firstName: 'Matt',
        lastName: 'Bon',
        email: 'mattbohn@gmail.com',
        username: 'mattbon',
        hashedPassword: bcrypt.hashSync('p1')
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
