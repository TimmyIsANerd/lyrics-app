import {
    AxiosRequestConfig
} from "axios";
import axios from "axios";


export default async function handler(req:any,res:any){

    if(req.method === "GET"){
        const options:AxiosRequestConfig = {
            method: "GET",
            url: "https://genius-song-lyrics1.p.rapidapi.com/search",
            params: {q: req.query.title, per_page: "10", page: "1"},
            headers:{
                'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com',
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
            }
        };

        axios.request(options)
        .then((response) =>{
            return res.status(200).json(response.data);
        })
        .catch(err => console.log(err))
    } else {
        return res.status(400)
    }

}