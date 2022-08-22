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
        url: 'https://barefootdetour.com/wp-content/uploads/2019/09/beautiful-vanlife-1-735x918.jpg.webp',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
      },

      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/09/beautiful-vanlife-8-735x733.jpg.webp',
        previewImage: true,
        spotId: 2,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/09/beautiful-vanlife-10-720x720.jpg.webp',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 3
      },
      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/09/beautiful-vanlife-13-735x919.jpg.webp',
        previewImage: true,
        spotId: 4,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/09/beautiful-vanlife-17-735x874.jpg.webp',
        previewImage: true,
        spotId: 5,
        reviewId: null,
        userId: 7
      },
      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/09/KMansVanlife-2-735x568.jpg.webp',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 8
      },
      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/07/vanlife-sagas-1-735x919.jpg.webp',
        previewImage: true,
        spotId: 7,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://barefootdetour.com/wp-content/uploads/2019/07/ourvanquest-3-735x919.jpg.webp',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://uploads-ssl.webflow.com/6105314daa8822ce4688e35e/618f8e7355e5102c768b86fb_The%20Bruce%20Banner%20Sprinter%20van%20with%20roof-mounte%20375-watt%20solar.jpg',
        previewImage: true,
        spotId: 9,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://uploads-ssl.webflow.com/6105314daa8822ce4688e35e/618f95c1b0993c14b1f6cea6_Solo%20female%20campervan%20living%20area.jpg',
        previewImage: true,
        spotId: 10,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://uploads-ssl.webflow.com/6105314daa8822ce4688e35e/618f973fde5df144c8040d72_Engineering%20student%27s%20campervan%20kitchen.jpg',
        previewImage: true,
        spotId: 11,
        reviewId: null,
        userId: 1
      },

      {
        url: 'https://trailandsummit.com/wp-content/uploads/2019/09/Sportsmobile-1-750x495.jpg.webp',
        previewImage: true,
        spotId: 12,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://trailandsummit.com/wp-content/uploads/2019/09/campovans-750x500.jpeg.webp',
        previewImage: true,
        spotId: 13,
        reviewId: null,
        userId: 3
      },
      {
        url: 'https://trailandsummit.com/wp-content/uploads/2019/09/freedom-750x1125.jpg.webp',
        previewImage: true,
        spotId: 14,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://gnomadhome.com/wp-content/uploads/2022/08/@tioaventuravan-sprinter-van-conversion-homey-interior-768x960.jpg',
        previewImage: true,
        spotId: 15,
        reviewId: null,
        userId: 7
      },
      {
        url: 'https://gnomadhome.com/wp-content/uploads/2022/08/@thewholeworldornothing-sprinter-van-camper-side-view-768x768.jpg',
        previewImage: true,
        spotId: 16,
        reviewId: null,
        userId: 8
      },
      {
        url: 'https://gnomadhome.com/wp-content/uploads/2022/08/@sonnysideup.co-sprinter-camper-van-unique-interior-768x576.jpg',
        previewImage: true,
        spotId: 17,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://gnomadhome.com/wp-content/uploads/2022/08/@the_moosecaboose-interior-of-a-sprinter-van-camper-768x960.jpg',
        previewImage: true,
        spotId: 18,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://www.thewanderingrv.com/wp-content/uploads/2022/07/Seth-and-Scarletts-Van.png?ezimgfmt=rs:675x854/rscb10/ng:webp/ngcb10',
        previewImage: true,
        spotId: 19,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://www.thewanderingrv.com/wp-content/uploads/2022/07/Jake-and-Giannas-Van.png?ezimgfmt=rs:675x646/rscb10/ng:webp/ngcb10',
        previewImage: true,
        spotId: 20,
        reviewId: null,
        userId: 9
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
