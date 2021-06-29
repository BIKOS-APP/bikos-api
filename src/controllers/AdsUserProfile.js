const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        const {user_id} = req.params;
    
        const advertisement = await connection('advertisements')
        .where({user_id})
        .join('users','users.id', '=', 'advertisements.user_id')
        .join('jobs','jobs.id', '=', 'advertisements.job_id')
        .select([
            'advertisements.id',
            'advertisements.title',
            'advertisements.description',
            'advertisements.available',
            'advertisements.created_at',
            'advertisements.updated_at',
            'jobs.job_name'
        ]);

        return res.json(advertisement);
    }
}