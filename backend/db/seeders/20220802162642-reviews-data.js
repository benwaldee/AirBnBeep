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
        review: 'This place was wonderful! A little smallish - but I enjoyed my stay and will recommend to friends and family :)',
        stars: 3,
        userId: 1,
        spotId: 13
      },
      {
        review: 'What a wonderful getaway. Everything was exactly as it appears in the pictures and so much more!',
        stars: 4,
        userId: 2,
        spotId: 13
      },

      {
        review: 'This spot was so cool. The host even left out snacks! However there was a large bug issue. 0/10 would not recommend.',
        stars: 1,
        userId: 3,
        spotId: 3
      },
      {
        review: 'The van rode great, and the stereo was excellent. I loved the wood on the interior and it felt very spacious. 5 stars deserved.',
        stars: 5,
        userId: 4,
        spotId: 3
      },

      {
        review: 'This was the vacation of my nightmares! Everything was perfect and matched all of my expectaions, except the bathroom did not work. Could not recommend.',
        stars: 2,
        userId: 4,
        spotId: 4
      },
      {
        review: 'The van had so much interior space! The half bathroom even felt large once you were inside of it. I loved the woodwork too!',
        stars: 5,
        userId: 5,
        spotId: 4
      },
      {
        review: 'I will be booking again, although the bed could stand to be replaced. Still enjoyed my stay!',
        stars: 3,
        userId: 5,
        spotId: 20
      },
      {
        review: 'The van did not run as smoothly as the host said it would. Gas trips were plentiful, and we could not go as far as we wanted. However, the interior was as advertised.',
        stars: 2,
        userId: 6,
        spotId: 5
      },

      {
        review: 'What a dream van conversion! Everything went smoothly and all of the interior decoration was gorgeous.',
        stars: 5,
        userId: 6,
        spotId: 6
      },
      {
        review: 'Van was eh. Pictures were definitely edited, actual product was just mid. Probably just get a hotel instead.',
        stars: 2,
        userId: 7,
        spotId: 15
      },

      {
        review: 'The van was the mobile spot I have always wanted! However the host was kind of annoying. Just block their number and have a great time!',
        stars: 3,
        userId: 7,
        spotId: 7
      },
      {
        review: 'What a dream van conversion! Everything went smoothly and all of the interior decoration was gorgeous.',
        stars: 4,
        userId: 8,
        spotId: 7
      },

      {
        review: 'The van did not run as smoothly as the host said it would. Gas trips were plentiful, and we could not go as far as we wanted. However, the interior was as advertised.',
        stars: 1,
        userId: 8,
        spotId: 8
      },
      {
        review: 'The van rode great, and the stereo was excellent. I loved the wood on the interior and it felt very spacious. 5 stars deserved.',
        stars: 5,
        userId: 9,
        spotId: 16
      },

      {
        review: 'This spot was so cool. The host even left out snacks! However there was a large bug issue. 0/10 would not recommend.',
        stars: 2,
        userId: 9,
        spotId: 1
      },
      {
        review: 'The van had so much interior space! The half bathroom even felt large once you were inside of it. I loved the woodwork too!',
        stars: 5,
        userId: 10,
        spotId: 1
      },

      {
        review: 'What a wonderful getaway. Everything was exactly as it appears in the pictures and so much more!',
        stars: 5,
        userId: 1,
        spotId: 1
      },
      {
        review: 'Spot was really cool but the space was definitely lacking. Other than that, everything was so fun and I loved the van life!',
        stars: 3,
        userId: 1,
        spotId: 2
      },
      {
        review: 'This place was wonderful! I enjoyed my stay and will recommend to friends and family :)',
        stars: 4,
        userId: 2,
        spotId: 14
      },

      {
        review: 'This was the vacation of my nightmares! Everything was perfect and matched all of my expectaions, except the bathroom did not work. Could not recommend.',
        stars: 1,
        userId: 3,
        spotId: 4
      },
      {
        review: 'This was exceptional. Could not get enough, will be booking again',
        stars: 5,
        userId: 4,
        spotId: 5
      },

      {
        review: 'Host forgot to provide keys, whole day turn-around really upset our trip. However, the van was perfect',
        stars: 2,
        userId: 4,
        spotId: 6
      },
      {
        review: 'The van was the mobile spot I have always wanted! However the host was kind of annoying. Just block their number and have a great time!',
        stars: 5,
        userId: 5,
        spotId: 7
      },
      {
        review: 'Brought my dog and everything went great! Will book again, loved the kitchen. Weird smell though.',
        stars: 3,
        userId: 5,
        spotId: 8
      },
      {
        review: 'Tires were flat, delayed a lot of our trip. Other than that, great listing.',
        stars: 2,
        userId: 6,
        spotId: 9
      },

      {
        review: 'Cannot beleive I got a taste of the van life! Well done, and thanks!',
        stars: 5,
        userId: 6,
        spotId: 10
      },
      {
        review: 'This spot was so cool. The host even left out snacks! However there was a large bug issue. 0/10 would not recommend.',
        stars: 2,
        userId: 7,
        spotId: 11
      },

      {
        review: 'This listing was about as average as it gets. Average space, average interior, average van. Blah. 3 Stars.',
        stars: 3,
        userId: 7,
        spotId: 12
      },
      {
        review: 'The van had so much interior space! The half bathroom even felt large once you were inside of it. I loved the woodwork too!',
        stars: 4,
        userId: 8,
        spotId: 15
      },

      {
        review: 'Scam. Van did not even have wheels. Avoid at all costs',
        stars: 1,
        userId: 8,
        spotId: 16
      },
      {
        review: 'I brought my entire pokemon card collection and battled with my friend! Oh and the van was cool as well.',
        stars: 5,
        userId: 9,
        spotId: 17
      },

      {
        review: 'The van reeked of smelly socks. But the kitchen had a cool backsplash.',
        stars: 2,
        userId: 9,
        spotId: 18
      },
      {
        review: 'What a wonderful getaway. Everything was exactly as it appears in the pictures and so much more!',
        stars: 5,
        userId: 10,
        spotId: 19
      },

      {
        review: 'Do you want to feel like a van-lifer? Do you have a few hundered bucks? Are you awesome? Book. This. Spot.',
        stars: 5,
        userId: 1,
        spotId: 20
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
