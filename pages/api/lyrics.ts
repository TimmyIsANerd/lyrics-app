import axios from "axios";
import {
    AxiosRequestConfig
} from "axios";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: `https://genius-song-lyrics1.p.rapidapi.com/songs/${req.query.id}/lyrics`,
            headers: {
                'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com',
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            }
        };

        axios.request(options)
            .then((response) => {
                return res.status(200).json(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        return res.status(400)
    }
}