import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from'react-helmet';

export default function Details() {
    let { id, media_type } = useParams();
    const [itemdetails, setItemDetails] = useState({});

    async function getItemDetails(id, mediaType) {
        try {
            let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=8b3f63eb5e1c6ae3f2708638eb1461c7`);
            setItemDetails(data);
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    }

    useEffect(() => {
        getItemDetails(id, media_type);
    }, [id, media_type]);

    return (
        <>
            <Helmet>
            <meta charSet='utf-8'/>
            <meta name="description" content="Discover the latest trending movies, TV shows, and people from around the world." />
            <title>Details</title>
            </Helmet>
            <div className="row">
                {itemdetails ?
                    <>
                        <div className="col-md-5">
                            {itemdetails.poster_path ? (
                                <img src={'https://image.tmdb.org/t/p/w500' + itemdetails.poster_path} alt={itemdetails.title || itemdetails.name} className="w-100" />
                            ) : itemdetails.profile_path ? (
                                <img src={'https://image.tmdb.org/t/p/w500' + itemdetails.profile_path} alt={itemdetails.name} className="w-100" />
                            ) : (
                                <p>No Image Available</p>
                            )}
                        </div>
                        <div className='col-md-7'>
                            <h2>{itemdetails.title || itemdetails.name}</h2>
                            {itemdetails.genres && (
                                <h3>Genre: {itemdetails.genres?.map(genre => genre.name).join(', ')}</h3>
                            )}
                            {itemdetails.vote_average !== undefined && (
                                <h3>Rating: {itemdetails.vote_average?.toFixed(1)}</h3>
                            )}
                            {itemdetails.vote_count !== undefined && (
                                <h3>Vote Count: {itemdetails.vote_count}</h3>
                            )}
                            {itemdetails.popularity && <h3>Popularity: {itemdetails.popularity}</h3>}
                            {itemdetails.status && <h3>Status: {itemdetails.status}</h3>}
                            {itemdetails.release_date && <h3>Release Date: {itemdetails.release_date}</h3>}
                            {itemdetails.birthday && <h3>Birthday: {itemdetails.birthday}</h3>}
                            {itemdetails.place_of_birth && (
                                <h3>Place of Birth: {itemdetails.place_of_birth}</h3>
                            )}
                            {itemdetails.known_for_department && (
                                <h3>Known For: {itemdetails.known_for_department}</h3>
                            )}
                            {itemdetails.overview ? (
                                <p>{itemdetails.overview}</p>
                            ) : (
                                <p>{itemdetails.biography}</p>
                            )}
                        </div>
                    </>:
                    <div className="col-12">
                        <p className="text-danger">Item not found or an error occurred.</p>
                    </div>}
            </div>
        </>
    );
    
}
