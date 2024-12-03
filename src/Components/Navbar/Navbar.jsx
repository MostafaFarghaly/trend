import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData,LogOut}) {
    return (<>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">
                    Navbar
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    {userData?<ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link active mx-3" to='home'>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link active mx-3" to='movies'>Movies</Link></li>
                        <li className="nav-item"><Link className="nav-link active mx-3" to='tv'>Tv</Link></li>
                        <li className="nav-item"><Link className="nav-link active mx-3" to='people'>People</Link></li>
                        <li className="nav-item"><Link className="nav-link active mx-3" to='about'>About</Link></li>
                    </ul>:''}
                    
                    <div className="d-flex ms-auto align-items-center">
                        {userData?<>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className='px-2' onClick={LogOut}><span className='text-dark'> LogOut</span></li>
                            <li className='px-2'><Link to='profile'>Profile</Link></li>
                            </ul></>:<><ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="px-2 "><Link to='login'>Login</Link></li>
                            <li className="px-2"><Link  to='/'>Register</Link></li>
                            </ul>
                        </>}
                    </div>
                </div>
            </div>
        </nav>
    </>)
}
