import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';
export default function Tv() {

    const [trendingTv, setTrendingTv] = useState([]);


    async function getTrending(mediaType, callback) {
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=8b3f63eb5e1c6ae3f2708638eb1461c7`)
        callback(data.results)
    }
    useEffect(() =>{
        getTrending('tv', setTrendingTv);
    }, [])
return (<>
    <Helmet>
            <meta charSet='utf-8'/>
            <meta name="description" content="Discover the latest trending movies, TV shows, and people from around the world." />
            <title>Popular Tv Shows</title>
    </Helmet>
    <div className='row py-5'>
        <div className='col-md-4 d-flex align-items-center'>
            <div>
                <div className='brder w-25 mt-3'></div>
                <h2 className='h4'>Trending <br/> movies <br/> to watch now</h2>
                <p className='py-2 text-white-50'>most watched movies by days</p>
                <div className='brder w-100 mt-3'></div>
            </div>
        </div>
        {trendingTv.map((item, index) => (<MediaItem key={index} item={item} />))}
    </div>
    
</>)
}