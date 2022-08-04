const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3002

const app = express()

app.get('/api/users', (req, res) => {
    res.status(200).json({message: 'welcome to the support desk api'})
})

app.listen(PORT, () => console.log(`Server up and running on PORT: ${PORT}`))