import React from 'react';
import { Helmet } from 'react-helmet';
export default function About() {
    return (<>
        <Helmet>
            <meta charSet='utf-8'/>
            <meta name="description" content="Discover the latest trending movies, TV shows, and people from around the world." />
            <title>About</title>
        </Helmet>
        <div className="container my-5">
            <h1 className="text-center text-info">About Us</h1>
            <p className="mt-4">
                Welcome to our website! We are dedicated to providing you with the best content and resources in entertainment and media.
                Whether you're here to discover the latest movies, explore popular TV shows, or learn about your favorite actors, we aim to deliver an engaging and user-friendly experience.
            </p>

            <h2 className="mt-4">Our Mission</h2>
            <p>
                Our mission is to make exploring entertainment simple, accessible, and fun for everyone. By combining data-driven recommendations with an intuitive design, we strive to be your go-to destination for all things entertainment.
            </p>

            <h2 className="mt-4">Why Choose Us?</h2>
            <ul>
                <li>Comprehensive information about movies, TV shows, and celebrities.</li>
                <li>Personalized user experience based on your preferences.</li>
                <li>Regular updates with the latest trends and releases.</li>
            </ul>

            <h2 className="mt-4">Get in Touch</h2>
            <p>
                We value your feedback and suggestions! Feel free to contact us at 
                <a href="mailto:info@yourwebsite.com" className="text-decoration-none text-info"> info@yourwebsite.com</a>.
            </p>

            <p className="mt-4 text-white-50">
                Thank you for visiting our site. We hope you have an amazing experience!
            </p>
        </div>
    </>);
}