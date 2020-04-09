const connection = require('../database/connection.js');

module.exports = {
    async index(_request, _response) {
        const ong_id = _request.headers.authorization;

        const incidents = await connection('incident')
            .where('ong_id', ong_id)
            .select('*');

        return _response.json(incidents);
    }
};