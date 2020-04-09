const connection = require('../database/connection.js')

module.exports = {
    async create(_request, _response) {
        const { id } = _request.body;

        const ong = await connection('ong')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return _response.status(400).json({ error: 'Nenhuma ONG encontrada com esse ID.' });
        }

        return _response.json(ong);
    }
};