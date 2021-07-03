const connection = require('../database/connection');

module.exports = {

    async index(req, res, next){
        try {

            const {page = 1} = req.query;

            const query = connection('advertisements')
            .where('advertisements.available', true)
            .join('users','users.id', '=', 'advertisements.announcer')
            .join('categories','categories.id', '=', 'advertisements.cat_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'advertisements.id',
                'advertisements.title',
                'advertisements.description',
                'advertisements.city',
                'advertisements.state',
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
    }, 

    async findByUserId(req, res){
        const {announcer} = req.params;
    
        const advertisement = await connection('advertisements')
        .where({announcer}).andWhere('advertisements.available', true)
        .join('users','users.id', '=', 'advertisements.user_id')
        .join('categories','categories.id', '=', 'advertisements.cat_id')
        .select([
            'advertisements.id',
            'advertisements.title',
            'advertisements.description',
            'advertisements.city',
            'advertisements.state',
            'advertisements.available',
            'advertisements.created_at',
            'categories.category'
        ]);

        return res.json(advertisement);
    },

    async findByCategory(req, res){
        const {cat_id} = req.params;
        const advertisement = await connection('advertisements')
        .join('users','users.id', '=', 'advertisements.user_id')
        .join('categories','categories.id', '=', 'advertisements.cat_id')
        .where({cat_id}).andWhere('advertisements.available', true)
        .select([
            'advertisements.id',
            'advertisements.title',
            'advertisements.description',
            'advertisements.city',
            'advertisements.state',
            'advertisements.available',
            'advertisements.created_at',
            'users.name',
            'categories.category'
        ]);

        return res.json(advertisement);
    },

    async findByCity(req, res){
        const {city} = req.query;

        const advertisement = await connection('advertisements')
        .join('users','users.id', '=', 'advertisements.user_id')
        .join('categories','categories.id', '=', 'advertisements.cat_id')
        .where({city}).andWhere('advertisements.available', true)
        .select([
            'advertisements.id',
            'advertisements.title',
            'advertisements.description',
            'advertisements.city',
            'advertisements.state',
            'advertisements.available',
            'advertisements.created_at',
            'users.name',
            'categories.category'
        ]);

        return res.json(advertisement);
    }

}