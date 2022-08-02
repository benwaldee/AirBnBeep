'use strict';

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
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Mark',
        lastName: 'Bon',
        email: 'markbohn@gmail.com',
        username: 'markbon',
        hashedPassword: '$2a$10$YHAAoiv12de1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Adam',
        lastName: 'Bon',
        email: 'adambohn@gmail.com',
        username: 'adambon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Joe',
        lastName: 'Bon',
        email: 'joebohn@gmail.com',
        username: 'joebon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvdddTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Drew',
        lastName: 'Bon',
        email: 'drewbohn@gmail.com',
        username: 'drewbon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Daniel',
        lastName: 'Bon',
        email: 'danielbohn@gmail.com',
        username: 'danielbon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'JB',
        lastName: 'Bon',
        email: 'JBbohn@gmail.com',
        username: 'JBbon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Ben',
        lastName: 'Bon',
        email: 'benbohn@gmail.com',
        username: 'benbon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Jordan',
        lastName: 'Bon',
        email: 'jordanbohn@gmail.com',
        username: 'jordanbon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
      },
      {
        firstName: 'Matt',
        lastName: 'Bon',
        email: 'mattbohn@gmail.com',
        username: 'mattbon',
        hashedPassword: '$2a$10$YHAAoivaxnYde1dasdanasLffBvPk8RmTugWaX.Ylhyrz6te'
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
