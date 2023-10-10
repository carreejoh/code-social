const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        sunday: [Routine]
        thursday: [Routine]
    }

    type Routine {
        _id: ID
        title: String
        description: String
        dayOfWeek: String
        length: Int
        startTime: Int
        endTime: Int
        priority: String
    }

    type Query {
        getAllUsers: [User]
        getUserByUsername: User
    }


`;

module.exports = typeDefs;