import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';


type Data = 
| { message: string }
| IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntry( req, res );

        case 'PUT':
            return updateEntry( req, res );

        case 'DELETE':
            return deleteEntry( req, res );
    
        default:
            return res.status(405).json({ message: 'Metodo no existe' });
    };
};

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();
    const entry = await Entry.findById( id );
    await db.disconnect();

    if( entry )
        return res.status(200).json( entry );

    else
        return res.status(400).json({ message: 'Not found' });
};

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();
    const entryToUpdate = await Entry.findById( id );

    if( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID: '+ id });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        return res.status(200).json( updatedEntry! );

    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'Bad Request' });
    }
};

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    try {
        const result = await Entry.findByIdAndDelete( id );

        await db.disconnect();
        if ( result )
            return res.status(200).json({ message: 'Entrada eliminada' });

        else
            return res.status(400).json({ message: 'No se pudo borrar' });


    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'Bad Request' });
    }
};