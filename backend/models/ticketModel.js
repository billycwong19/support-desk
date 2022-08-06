const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'please select product'],
        enum: ['iPhone', 'MacBook Pro', 'iMac', 'iPad'],
        default: 'iPhone',
    },
    description: {
        type: String,
        required: [true, 'please add description of problem'],
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: false,
    }
},
{
    timestamps: true
} 
)

module.exports = mongoose.model('Ticket', ticketSchema)