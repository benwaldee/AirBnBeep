'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Bookings', 'spotId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      }
    )

    await queryInterface.addColumn('Images', 'spotId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      }
    )

    await queryInterface.addColumn('Images', 'reviewId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reviews'
        },
        onDelete: 'CASCADE'
      })

    await queryInterface.addColumn('Reviews', 'spotId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      })

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Bookings', 'spotId')
    await queryInterface.removeColumn('Images', 'spotId')
    await queryInterface.removeColumn('Images', 'reviewId')
    await queryInterface.removeColumn('Reviews', 'spotId')
  }
};
