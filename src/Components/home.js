import React from 'react';
import {NavLink} from 'react-router-dom';
const home = (props)=>(
    <div className="content">
        <h1 className="title">Welcome to My Poll</h1>
        <p>Looking for the best free online poll maker? Look no further than the MyPoll online poll creator! Whatever the purpose of your poll – be it an opinion poll for research purposes, your general curiosity about people’s thoughts on a particular issue or an attempt to find the most suitable time to plan a meeting according to your work colleague’s availability – with MyPoll's free poll maker, all bases are covered. Not only is the MyPoll poll maker free, it’s also quick, easy and straightforward to use! Want to know more about how to start using the MyPoll poll maker?</p>
        <p>To begin, click <NavLink to='/new'>here</NavLink> to create a new poll.</p>
        <p>Happy polling</p>
    </div>
)

export default home;