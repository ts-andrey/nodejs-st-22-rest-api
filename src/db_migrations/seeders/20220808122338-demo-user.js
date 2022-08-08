'use strict';

import { v4 as uuidv4 } from 'uuid';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'EvilDead_1981',
          password: 'evil',
          age: 41,
        },
        {
          login: 'EvilDead_1987',
          password: 'veryEvil',
          age: 35,
        },
        {
          login: 'DarknessArmy_1993',
          password: 'veryManyEvil',
          age: 29,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
