import find from 'lodash.find';
import remove from 'lodash.remove';
import filter from 'lodash.filter';
import db from './_db';

const typeDefs = ` 
type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String 
}
    
type Person {
    id: String!
    firstName: String!
    lastName: String! 
    cars: [Car!]
}

type Query {
    person(id: String!): Person
    car(id: String!): Car
    people: [Person] 
    cars: [Car]
}

type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String, lastName: String): Person
    removePerson(id: String!): Person

    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String): Car
    updateCar(id: String!, price: Float, personId: String): Car
    removeCar(id: String!): Car
}`;

const resolvers = {
  Query: {
    people: () => db.people,
    person: (root, args) => find(db.people, { id: args.id }),
    cars: () => db.cars,
    car: (root, args) => find(db.cars, { id: args.id }),
  },

  Person: {
    cars: (parent) => filter(db.cars, { personId: parent.id }),
  },

  Mutation: {
    addPerson: (root, args) => {
      if (find(db.people, { id: args.id })) {
        throw new Error(`A person with id ${args.id} already exists`);
      }
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      db.people.push(newPerson);
      return newPerson;
    },

    updatePerson: (root, args) => {
      const person = find(db.people, { id: args.id });
      if (!person) throw new Error(`Couldn't find a person with id ${args.id}`);

      person.firstName = args.firstName || person.firstName;
      person.lastName = args.lastName || person.lastName;

      return person;
    },

    removePerson: (root, args) => {
      const removedPerson = find(db.people, { id: args.id });
      if (!removedPerson)
        throw new Error(`Couldn't find a person with id ${args.id}`);

      remove(db.people, (p) => p.id === removedPerson.id);
      db.cars = db.cars.filter((car) => car.personId !== args.id);

      return removedPerson;
    },

    addCar: (root, args) => {
      if (find(db.cars, { id: args.id })) {
        throw new Error(`A car with id ${args.id} already exists`);
      }

      if (args.personId !== undefined) {
        const personExists = find(db.people, { id: args.personId });
        if (!personExists) {
          throw new Error(`Person with id ${args.personId} does not exist`);
        }
      }

      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId || null,
      };

      db.cars.push(newCar);
      return newCar;
    },

    updateCar: (root, args) => {
      const car = find(db.cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find a car with id ${args.id}`);

      if (args.price !== undefined && args.price !== null) {
        car.price = args.price;
      }
      if (args.personId !== undefined) {
        const personExists = find(db.people, { id: args.personId });
        if (!personExists)
          throw new Error(`Person with id ${args.personId} does not exist`);

        car.personId = args.personId;
      }

      return car;
    },

    removeCar: (root, args) => {
      const removedCar = find(db.cars, { id: args.id });
      if (!removedCar)
        throw new Error(`Couldn't find a car with id ${args.id}`);

      remove(db.cars, (c) => c.id === removedCar.id);
      return removedCar;
    },
  },
};

export { typeDefs, resolvers };
