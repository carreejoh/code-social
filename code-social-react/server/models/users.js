const { Schema, model } = require('mongoose');
const { emailValidation } = require('../../app/verify/verify')

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
    },
    {
        toJSON: {
          virtuals: true,
        }
    },
);

const User = model('user', userSchema);

module.exports = User;