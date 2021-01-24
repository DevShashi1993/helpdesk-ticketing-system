import React from 'react';
import { } from 'react-redux';
import logo from '../../assets/brand/bootstrap-logo.svg';
import './Register.css';

const Register = () => {
    return (
        <main className="form-register text-center">
            <form>
                <img className="mb-4" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <input className="form-control" type="text" placeholder="Full Name" aria-label="default input example"/>
                <input className="form-control" type="text" placeholder="Email" aria-label="default input example"/>
                <input className="form-control" type="password" placeholder="Password" aria-label="default input example"/>
                <input className="form-control" type="password" placeholder="Confirm Password" aria-label="default input example"/>
                <br/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </form>
        </main>
    );
  }
  
  export default Register;