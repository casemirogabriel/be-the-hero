const crypto = require('crypto');
const connection = require('../database/connection.js');

module.exports = {
    async index(_request, _response) {
        const ongs = await connection('ong').select('*');

        return _response.json(ongs);
    },

    async create(_request, _response) {
        const { name, email, whatsapp, city, uf } = _request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ong').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return _response.json({ id });
    }
};