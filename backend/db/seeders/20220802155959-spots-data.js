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

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '111 test drive',
        city: 'LA',
        state: 'Oklahoma',
        country: 'USA',
        lat: 101.127928,
        lng: 12.218267,
        name: 'Acreage',
        description: 'quant village house',
        price: 200,
      },
      {
        ownerId: 1,
        address: '1112 test drive',
        city: 'BA',
        state: 'Oklahoma',
        country: 'USA',
        lat: 101.127928,
        lng: 12.218267,
        name: 'Acreage2',
        description: ' village house',
        price: 200,
      },
      {
        ownerId: 2,
        address: '222 test drive',
        city: 'Saint Louis',
        state: 'Washington',
        country: 'USA',
        lat: 11.127928,
        lng: 142.218267,
        name: 'Farms',
        description: 'Lorem ipsum',
        price: 100,
      },
      {
        ownerId: 3,
        address: '333 test drive',
        city: 'Popple',
        state: 'Worshen',
        country: 'USA',
        lat: 701.127928,
        lng: 1.218267,
        name: 'Hoops',
        description: 'armen astid wqal',
        price: 150,
      },
      {
        ownerId: 4,
        address: '444 test drive',
        city: 'Cart',
        state: 'Amper',
        country: 'USA',
        lat: 1081.127928,
        lng: 172.218267,
        name: 'Walton',
        description: 'arger istum wor',
        price: 145,
      },
      {
        ownerId: 5,
        address: '555 test drive',
        city: 'Darm',
        state: 'Awlp',
        country: 'USA',
        lat: 1501.127928,
        lng: 152.218267,
        name: 'Camper',
        description: 'damp house',
        price: 450,
      },
      {
        ownerId: 6,
        address: '66 test drive',
        city: 'NYC',
        state: 'New York',
        country: 'USA',
        lat: 1021.127928,
        lng: 142.218267,
        name: 'Highrise',
        description: 'skyscraper tendencies',
        price: 1200,
      },
      {
        ownerId: 7,
        address: '777 test drive',
        city: 'Portland',
        state: 'Oregon',
        country: 'USA',
        lat: 10341.127928,
        lng: 142.218267,
        name: 'Stamp',
        description: 'dont visit plz',
        price: 45,
      },
      {
        ownerId: 8,
        address: '888 test drive',
        city: 'Arbor',
        state: 'Tree',
        country: 'USA',
        lat: 10671.127928,
        lng: 12777.218267,
        name: 'Oak',
        description: 'Just a tree',
        price: 12,
      },
      {
        ownerId: 9,
        address: '999 test drive',
        city: 'Dream',
        state: 'Minecraft',
        country: 'USA',
        lat: 1401.127928,
        lng: 1552.218267,
        name: 'Diamond',
        description: 'hunters',
        price: 180,
      },
      {
        ownerId: 10,
        address: '101010 test drive',
        city: 'Outer Space',
        state: 'Milky Way',
        country: 'Universe',
        lat: 1441.127928,
        lng: 1442.218267,
        name: 'Moon',
        description: 'just try',
        price: 500,
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
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
