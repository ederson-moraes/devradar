const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')


module.exports = {

    async index(req, res) {
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (dev) {
            return res.status(400).json({ error: 'Dev already exists' })
        }

        if (!github_username || !techs) {
            return res.status(400).json({ error: 'GitHub username and techs are required' })
        }

        const response = await axios.get(`https://api.github.com/users/${github_username}`)

        const { name = login, bio, avatar_url } = response.data
        const techsArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        dev = await Dev.create({
            name,
            github_username,
            bio,
            avatar_url,
            techs: techsArray,
            location,
        })

        return res.json(dev)

    },

    async update() {
        // This method is not implemented yet
        // You can implement the logic to update a Dev's information here
        return res.status(501).json({ error: 'Update method not implemented' })
    },

    async destroy() {
        // This method is not implemented yet
        // You can implement the logic to delete a Dev here
        return res.status(501).json({ error: 'Destroy method not implemented' })
    }
}