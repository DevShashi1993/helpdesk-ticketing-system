import React from 'react';
import { } from 'react-redux';

const Landing = () => {
    return (
        <div class="card m-5">
        <div class="card-body">
            <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
            <a href="/login" class="btn btn-primary">Login</a>
            <a href="/register" class="btn btn-primary m-2">Register</a>
        </div>
        </div>
    );
  }
  
  export default Landing;