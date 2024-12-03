import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from'react-router-dom';
import Layout from '../Layout/Layout';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { jwtDecode } from 'jwt-decode';
import Home from '../Home/Home';
import About from '../About/About';
import Tv from '../Tv/Tv';
import People from '../People/People';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Details from '../ItemDetails/Details';
import { Offline} from 'react-detect-offline';
export default function App() {
    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
            saveUserData();
        }
    },[])
    const [userData, setUserData] = useState(null);
    function saveUserData() {
        let encodedToken = localStorage.getItem('userToken');
        let decodeToken = jwtDecode(encodedToken);
        setUserData(decodeToken);
    }
    let routers = createBrowserRouter([
        { path: '/' , element:<Layout setUserData={setUserData} userData={userData} /> , children:[
            {path: 'home' , element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
            {path: 'movies' , element:<ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
            {path: 'tv' , element:<ProtectedRoute userData={userData}><Tv/></ProtectedRoute>},
            {path: 'about' , element:<ProtectedRoute userData={userData}><About/></ProtectedRoute>},
            {path: 'People' , element:<ProtectedRoute userData={userData}><People/></ProtectedRoute>},
            {path: 'details/:id/:media_type' , element:<ProtectedRoute userData={userData}><Details/></ProtectedRoute>},
            {path:'profile' , element:<ProtectedRoute userData={userData}><Profile userData={userData}/></ProtectedRoute>},
            {path: 'login' , element:<Login saveUserData={saveUserData}/>},
            {index:true , element:<Register/>},
            {path: '*' , element:<NotFound/>}  
        ]}
    ])
    return (<>
        <div>
            <Offline>You 're offline.</Offline>
        </div>
        <RouterProvider router={routers} />
    </>
        

    )
}
