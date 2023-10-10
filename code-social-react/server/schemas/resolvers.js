const { AuthenticationError } = require('apollo-server-express');
const { User, Routine } = require('../models');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await User.find({});
        },
        getUserByUsername: async (args) => {
            return await User.find({username: args.person}).populate('routine')
        }
    }
}

module.exports = resolvers;