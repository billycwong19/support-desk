const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    get note for a ticekt
// @route   GET /api/tickets/:ticketId/notes
// @access  private
const getNotes = asyncHandler(async (req, res) => {
    // get user using id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket =  await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId})

    res.status(200).json(notes)
})

// @desc    create ticket note
// @route   GET /api/tickets/:ticketId/notes
// @access  private
const addNote = asyncHandler(async (req, res) => {
    // get user using id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket =  await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const note = await Note.create({ 
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false,
        user: req.user.id
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}