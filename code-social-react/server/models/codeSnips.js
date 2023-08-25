const { Schema, model } = require('mongoose');

const codeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 140
        },
        username: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
          virtuals: true,
        }
      }
);

const Code = model('codeSnips', codeSchema);

module.exports = Code;