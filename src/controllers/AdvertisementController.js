const connection = require('../database/connection');

module.exports = {

    async index(req, res, next){
        try {

            const {page = 1} = req.query;

            const query = connection('advertisements')
            .join('users','users.id', '=', 'advertisements.user_id')
            .join('categories','categories.id', '=', 'advertisements.cat_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'advertisements.id',
                'advertisements.title',
                'advertisements.description',
                'advertisements.available',
                'advertisements.created_at',
                'users.name',
	            'categories.category'
            ]);

            const countObj = connection('advertisements').count()

            const [count] = await countObj
            
            res.header('X-Total-Count', count["count"])

            const results = await query

            return res.json(results);

        } catch (error) {
            next(error)
        }
    }
}