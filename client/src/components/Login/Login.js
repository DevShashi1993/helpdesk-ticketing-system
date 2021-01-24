import React from 'react';
import { } from 'react-redux';
import logo from '../../assets/brand/bootstrap-logo.svg';
import './Login.css';

const Login = () => {
    return (
        <main className="form-signin text-center">
            <form>
                <img className="mb-4" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <label for="inputEmail" className="visually-hidden">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                <label for="inputPassword" className="visually-hidden">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <br/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </form>
        </main>
    );
}

export default Login;