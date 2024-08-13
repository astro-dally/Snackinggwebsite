import React from 'react';
import Image from '../assets/AboutImg.png';
import '../CSS/AboutPage.css';

export default function About() {
    return (
        <div className='About'>
            {/* About page Heading */}
            <h1 className='AboutName'>About The Snackky Nerds</h1>
            {/* About page image and text */}
            <div className='AboutContent'>
                {/* <img className="AboutImg" src={Image} alt="Snackky Nerds" /> */}
                <p className='AboutText'>
                    Welcome to Snackky Nerds, the go-to spot for techies who need a snack fix. Whether you’re deep in a project or just taking a break, we’ve got the snacks you need to keep you going.<br /><br />
                    We’re all about making snack time simple and satisfying. Just pick your favorites, and we’ll take care of the rest. It’s all about quick, easy, and tasty treats for those who love tech and need a good snack!
                </p>
                <img className="AboutImg" src={Image} alt="Snackky Nerds" />
            </div>
        </div>
    )
}
