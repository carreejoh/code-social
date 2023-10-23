const { Schema, model } = require('mongoose');
const { emailValidation } = require('../../app/verify/verify');

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
        },
        latestDate: {
            type: String
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
)

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [emailValidation, "Email address is invalid!"],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 30,
        },
        sunday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        monday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        tuesday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        wednesday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        thursday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        friday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        saturday: [
            {
                type: Schema.Types.ObjectId,
                ref: 'routine'
            }
        ],
        statSheet: statSchema
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);

statSchema.virtual('totalCompleted').get(function() {
    return this.highCompleted + this.highestCompleted
})

statSchema.virtual('highestPriorityPercent').get(function() {
    if (this.highestCompleted === 0) {
        return 0; 
    }
    return Math.floor(this.highestCompleted / this.highestOccured * 100);  
});

statSchema.virtual('highPriorityPercent').get(function() {
    if (this.highCompleted === 0) {
        return 0; 
    }
    return Math.floor(this.highCompleted / this.highOccured * 100);  
});

const User = model('user', userSchema);

module.exports = User;