'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )
      Image.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      )
      Image.belongsTo(
        models.Review,
        { foreignKey: 'reviewId' }
      )
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      validate: {
        checkNullReviewId(value) {
          if (this.reviewId === null && value === null) {
            throw new Error('Image must relate to at least one table')
          }
        }
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      validate: {
        checkNullSpotId(value) {
          if (this.spotId === null && value === null) {
            throw new Error('Image must relate to at least one table')
          }
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
