import React from 'react';
import { Helmet } from 'react-helmet';
export default function Profile({ userData }) {
    return (<>
        <Helmet>
            <meta charSet='utf-8'/>
            <meta name="description" content="Discover the latest trending movies, TV shows, and people from around the world." />
            <title>Profile</title>
        </Helmet>
        <div className="container my-5">
            <h1 className="text-center text-info">User Profile</h1>
            
            {userData ? (
                <div className="mt-4">
                    <h3>Hello, <span className="text-primary">{userData.first_name} {userData.last_name}</span>!</h3>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>First Name:</strong> {userData.first_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Last Name:</strong> {userData.last_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Email:</strong> {userData.email}
                        </li>
                        <li className="list-group-item">
                            <strong>Age:</strong> {userData.age}
                        </li>
                    </ul>
                </div>
            ) : (
                <p className="text-danger mt-4">No user data found. Please log in to view your profile.</p>
            )}
        </div>
        </>);
}
