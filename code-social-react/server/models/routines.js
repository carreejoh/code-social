const { Schema, model } = require('mongoose');

const routineSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        dayOfWeek: {
            type: String,
            required: true,
            trim: true
        },
        length: {
            type: Number,
            required: true
        },
        startTime: {
            type: Number,
            required: true
        },
        endTime: {
            type: Number,
            required: true
        },
        priority: {
            type: String,
            required: false
        }
    },
    {
        toJSON: {
          virtuals: true,
        }
    },
);

const Routine = model('routine', routineSchema);

module.exports = Routine;