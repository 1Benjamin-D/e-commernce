import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import * as bcrpyt from 'bcryptjs'

export async function POST(req: NextRequest) {
    const res = NextResponse
    let apiKey = req.headers.get('api-key');
    bcrpyt.compare(process.env.API_KEY!, apiKey!, function (err) {
        if (err) {
            return res.json({ success: false, type: "error", message: 'Forbidden' }, {
                status: 401
            })
        }
    })
    let { user_token, user_token_params } = await req.json();
    if (user_token && user_token_params) {
        if (user_token !== user_token_params) {
            return res.json({ success: false, message: 'Token and token url not the same.' }, {
                status: 401
            })
        }
    }
    const { exp } = jwt.decode(user_token)
    let currentTime = Date.now() / 1000
    if (currentTime > exp) {
        return res.json({ success: false, message: 'Token expired' }, {
            status: 401
        })
    }
    else {
        return res.json({ success: true, message: 'Token valid.' }, {
            status: 200
        })
    }
}