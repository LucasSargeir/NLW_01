import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{

    async index(request: Request, response: Response){

        // filtros: cidade, uf, items

        const {city, uf, items} = request.query;

        const parsedItem = String(items)
            .split(',')
            .map(item => Number (item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', "=", 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItem)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ... point,
                image_url: `http://192.168.15.9:7777/uploads/${point.image}`,
                //exp://192.168.15.9:19000
            };
        })

        return response.json(serializedPoints);

    }

    async show(request: Request, response: Response){

        //const id = request.params.id;
        const {id} = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){

            return response.status(400).json({message: 'Ponto não encontrado'});

        }

        const serializedPoint = {
                ... point,
                image_url: `http://192.168.15.9:7777/uploads/${point.image}`,
                //exp://192.168.15.9:19000
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({point: serializedPoint, items});

    }

    async create(request: Request, response: Response){

    const {
        email,
        name,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction();

    const point = {
        image: request.file.filename,
        email,
        name,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    }

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0]

    const pointItems = items
            .split(',')
            .map((item:string) => Number(item.trim()))
            .map((item_id: number )=> {

        return{

            item_id,
            point_id,

        }

    })

    await trx('point_items').insert(pointItems);
    
    await trx.commit();
    
    return response.json({
        id: point_id,
        ... point,
    });

    }

}

export default PointsController;