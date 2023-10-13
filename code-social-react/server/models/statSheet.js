const { Schema, model } = require('mongoose');

const statSchema = new Schema(
    {
        highOccured: {
            type: Number,
        },
        highestOccured: {
            type: Number
        },
        highCompleted: {
            type: Number
        },
        highestCompleted: {
            type: Number
        },
        // How many events per weekday have been seen
        // Order from Sunday to Saturday. Example: [20, 10, 12, 13, 23, 23, 43]
        weekdayOccur: {
            type: [Number]
        },
        weekdayCompleted: {
            type: [Number]
        },
        signUpDate: {
            type: String,
            // required: true
        },
        graphData: {
            type: [Number]
        }
    }
);


const Stats = model('stats', statSchema);

module.exports = Stats