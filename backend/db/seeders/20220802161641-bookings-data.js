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

    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-01-17T04:33:12.000Z',
        endDate: '2022-01-17T04:33:12.000Z',
      },
      {
        spotId: 1,
        userId: 6,
        startDate: '2023-01-17T04:33:12.000Z',
        endDate: '2023-01-17T04:33:12.000Z',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-02-17T04:33:12.000Z',
        endDate: '2022-11-17T04:33:12.000Z',
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2022-01-01T04:33:12.000Z',
        endDate: '2022-01-17T04:33:12.000Z',
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2023-01-17T04:33:12.000Z',
        endDate: '2023-01-17T04:33:12.000Z',
      },
      {
        spotId: 5,
        userId: 6,
        startDate: '2022-05-13T04:33:12.000Z',
        endDate: '2022-06-17T04:33:12.000Z',
      },
      {
        spotId: 6,
        userId: 7,
        startDate: '2022-12-17T04:33:12.000Z',
        endDate: '2022-12-19T04:33:12.000Z',
      },
      {
        spotId: 7,
        userId: 8,
        startDate: '2022-08-17T04:33:12.000Z',
        endDate: '2022-09-17T04:33:12.000Z',
      },
      {
        spotId: 8,
        userId: 9,
        startDate: '2022-01-07T04:32:12.000Z',
        endDate: '2022-01-17T04:33:12.000Z',
      },
      {
        spotId: 9,
        userId: 10,
        startDate: '2022-01-17T04:33:12.000Z',
        endDate: '2022-01-17T04:13:12.000Z',
      },
      {
        spotId: 10,
        userId: 1,
        startDate: '2022-03-17T04:33:12.000Z',
        endDate: '2022-03-30T04:33:12.000Z',
      }

    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
