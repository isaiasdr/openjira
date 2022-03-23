import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {

    const id = req.page.params?.id || '';
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    
    if( !checkMongoIDRegExp.test( id ) ) {
        const response = {
            message: 'El id no es valido ' + id
        };

        return new Response( JSON.stringify(response), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',

            }
        });
    }
    
    return NextResponse.next();
};