const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Email address is invalid!"],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 30,
        },
        codeSnips: [
            {
                type: Schema.Types.ObjectId,
                ref: 'codeSnips'
            }
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                required: false,
                ref: 'posts'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        }
    },
);

const User = model('user', userSchema);

module.exports = User;