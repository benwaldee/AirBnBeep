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

    await queryInterface.bulkInsert('Images', [
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
      },
      {
        url: 'www.example.com',
        previewImage: false,
        spotId: 2,
        reviewId: null,
        userId: 2
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 3
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 4,
        reviewId: null,
        userId: 4
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 5,
        reviewId: null,
        userId: 5
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 6
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 7,
        reviewId: null,
        userId: 7
      },
      {
        url: 'www.example.com',
        previewImage: false,
        spotId: 7,
        reviewId: null,
        userId: 7
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 8
      },
      {
        url: 'www.example.com',
        previewImage: true,
        spotId: 9,
        reviewId: null,
        userId: 9
      },
      {
        url: 'www.review.com',
        previewImage: true,
        spotId: null,
        reviewId: 2,
        userId: 1
      },
      {
        url: 'www.review.com',
        previewImage: true,
        spotId: null,
        reviewId: 5,
        userId: 4
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
    await queryInterface.bulkDelete('Images', null, {});
  }
};
