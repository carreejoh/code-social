// const { Schema, model } = require('mongoose');

// const weekSchema = new Schema(
//     {
//         weekday: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         routines: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: 'routines'
//             }
//         ],
//         username: {
//             type: String,
//             required: true
//         }
//     },
//     {
//         toJSON: {
//             virtuals: true
//         }
//     }
// );

// const Week = model('week', weekSchema);

// module.exports = Week;