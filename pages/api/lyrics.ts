import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
    AxiosRequestConfig
} from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: `https://genius-song-lyrics1.p.rapidapi.com/songs${req.query.id}`,
        headers: {
            'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
        }
    };

    try {
        let response = await axios(options);
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
    }
}