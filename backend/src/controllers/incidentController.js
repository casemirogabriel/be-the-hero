const connection = require('../database/connection.js');

module.exports = {
    async index(_request, _response) {
        const { page = 1 } = _request.query;

        const [count] = await connection('incident').count();
        console.log(count);

        const ongs = await connection('incident')
        .join('ong', 'ong.id', '=', 'incident.ong_id')    
        .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incident.*',
                'ong.name',
                'ong.email',
                'ong.whatsapp',
                'ong.city',
                'ong.uf'
            ]);

        _response.header('X-Total-Count', count['count(*)']);

        return _response.json(ongs);
    },

    async create(_request, _response) {
        const { title, description, value } = _request.body;
        const ong_id = _request.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id,
        });

        return _response.json({ id });
    },

    async delete(_request, _response) {
        const { id } = _request.params;
        const ong_id = _request.headers.authorization;

        const incident = await connection('incident')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return _response.status(401).json({ error: 'Operação não permitida.' });
        }

        await connection('incident').where('id', id).delete();

        return _response.status(204).send();
    }
};