import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({item}) {
return (<>
    <div className='col-md-2'>
        <Link to={`/details/${item.id}/${item.media_type}`} className='text-white'>
            <div className='movie position-relative'>
                {item.poster_path?<img src={'https://image.tmdb.org/t/p/w500/'+item.poster_path} alt='' className='w-100 img' />:
                <img src={'https://image.tmdb.org/t/p/w500/'+item.profile_path} alt='' className='w-100 img' />}
                <h3 className='h6 my-2'>{item.title} {item.name}</h3>
                {item.vote_average?<div className='vote p-2 text-white position-absolute top-0 end-0'>{item.vote_average?.toFixed(1)}</div>:""}
            </div>
        </Link>
    </div>

</>
)
}
