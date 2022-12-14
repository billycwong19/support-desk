const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    get current tickets
// @route   GET /api/tickets/
// @access  private
const getTickets = asyncHandler(async (req, res) => {
    // get user using id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

// @desc    get single user ticket
// @route   GET /api/tickets/:id
// @access  private
const getTicket = asyncHandler(async (req, res) => {
    // get user using id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('not authorized')
    }

    res.status(200).json(ticket)
})

// @desc    create new ticket
// @route   POST /api/tickets/
// @access  private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('please add a product and description')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @desc    delete single user ticket
// @route   DELETE /api/tickets/:id
// @access  private
const deleteTicket = asyncHandler(async (req, res) => {
    // get user using id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('not authorized')
    }

    await ticket.remove()

    res.status(200).json({ success: true })
})

// @desc    update single user ticket
// @route   PUT /api/tickets/:id
// @access  private
const updateTicket = asyncHandler(async (req, res) => {
    // get user using id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}