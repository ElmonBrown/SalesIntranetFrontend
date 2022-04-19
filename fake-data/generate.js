module.exports = function () {
  const faker = require('faker');
  const _ = require('lodash');

  return {
    products: _.times(36, (n) => {
      return {
        id: n + 1,
        Name: faker.lorem.words(1),
        ListPrice: _.sample([ 1000, 1500, 1740, 4000, 900, 224]),
        TechnicalSheet: faker.datatype.string(17),
        CategoryId: _.sample([ 1, 2, 3, 4, 5, 6]),
        PhotoURL: _.sample([
          'https://cdn.pixabay.com/photo/2017/02/27/21/47/yogurt-2104327_960_720.jpg', 
          'https://cdn.pixabay.com/photo/2016/02/19/11/35/makeup-1209798_960_720.jpg', 
          'https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_960_720.jpg',
          'https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberry-1330459_960_720.jpg',
          'https://cdn.pixabay.com/photo/2017/07/16/22/22/bath-oil-2510783_960_720.jpg',
        ]),
        Description: faker.lorem.words(80),
        Tag: _.sample([ 'Nuevo', 'Especial']),
        Presentations: [
          { 
            id: n + 1, 
            Name: faker.lorem.words(1), 
            WeightInKG: _.sample([ 10, 15, 17, 4, 9, 2]), 
            Quantity: _.sample([0, 28, 35, 6, 45, 83, 24]), 
          },
          { 
            id: n + 1, 
            Name: faker.lorem.words(1), 
            WeightInKG: _.sample([ 4, 13, 10, 4, 8, 1]), 
            Quantity: _.sample([0, 28, 35, 6, 45, 83, 24]), 
          },
        ],
      }
    }),
  }
}

