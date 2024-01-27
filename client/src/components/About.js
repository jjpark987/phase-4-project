import React from "react";

function About() {
    return (
        <div id='about'>
            <div id='about-head'>
                <div id='about-head-box'>
                    <h1><span>Design</span> and track your weekly workout routine</h1>
                </div>
            </div>
            <div id='about-body'>
                <div id='about-body-box-1' className='about-body-box'>
                    <img 
                        src='about-body-1.gif' 
                        alt='about-body-1'
                    />
                    <h1>Choose from over a <span>thousand</span> different exercises</h1>
                </div>
                <div id='about-body-box-2' className='about-body-box'>
                    <h1><span>Add</span> new exercises to the database</h1>
                    <img 
                        src='about-body-2.gif' 
                        alt='about-body-2'
                    />
                </div>
                <div id='about-body-box-3' className='about-body-box'>
                    <img 
                        src='about-body-3.gif' 
                        alt='about-body-3'
                    />
                    <h1>Customize the number of <span>sets</span>, <span>reps</span>, and <span>weight</span> for resistance exercises</h1>
                </div>
                <div id='about-body-box-4' className='about-body-box'>
                    <h1>Or set the <span>duration</span> for cardiovascular exercises</h1>
                    <img 
                        src='about-body-4.gif' 
                        alt='about-body-4'
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
