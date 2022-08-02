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

    await queryInterface.bulkInsert('Reviews', [
      {
        review: 'place was so-so. My wife loved it.',
        stars: 3,
        userId: 1,
        spotId: 2
      },
      {
        review: 'place was great. My son loved it.',
        stars: 4,
        userId: 2,
        spotId: 2
      },

      {
        review: 'place was dope. My dog loved it.',
        stars: 1,
        userId: 3,
        spotId: 3
      },
      {
        review: 'place was great. My son loved it.',
        stars: 5,
        userId: 4,
        spotId: 3
      },

      {
        review: 'place was bad. My mom loved it.',
        stars: 2,
        userId: 4,
        spotId: 4
      },
      {
        review: 'place was great. My son loved it.',
        stars: 5,
        userId: 5,
        spotId: 4
      },
      {
        review: 'place was cool. My parrot loved it.',
        stars: 3,
        userId: 5,
        spotId: 5
      },
      {
        review: 'place was dumb. My son loved it.',
        stars: 2,
        userId: 6,
        spotId: 5
      },

      {
        review: 'place was sick. My mum loved it.',
        stars: 5,
        userId: 6,
        spotId: 6
      },
      {
        review: 'place was eh. My car loved it.',
        stars: 2,
        userId: 7,
        spotId: 6
      },

      {
        review: 'place was huh. My what loved it.',
        stars: 3,
        userId: 7,
        spotId: 7
      },
      {
        review: 'place was sweeeet. My ark evolution loved it.',
        stars: 4,
        userId: 8,
        spotId: 7
      },

      {
        review: 'place was bad. My ant loved it.',
        stars: 1,
        userId: 8,
        spotId: 8
      },
      {
        review: 'place was redacted. My redacted loved it.',
        stars: 5,
        userId: 9,
        spotId: 8
      },

      {
        review: 'place was stinky. My gf loved it.',
        stars: 2,
        userId: 9,
        spotId: 9
      },
      {
        review: 'place was haunted. My ghost loved it.',
        stars: 5,
        userId: 10,
        spotId: 9
      },

      {
        review: 'place was nice. My gf loved it. I am only review yay!',
        stars: 5,
        userId: 1,
        spotId: 10
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
