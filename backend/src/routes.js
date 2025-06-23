const { Router } = require('express')
const axios = require('axios')
const Dev = require('./models/Dev')


const routes = Router()

routes.post('/devs', async (req, res) => {

    const { github_username, techs } = req.body

    if (!github_username || !techs) {
        return res.status(400).json({ error: 'GitHub username and techs are required' })
    }

    const response = await axios.get(`https://api.github.com/users/${github_username}`)

    const { name = login, bio, avatar_url } = response.data
    const techsArray = techs.split(',').map(tech => tech.trim())

    const dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
    })

    return res.json(dev)

})

module.exports = routes;


