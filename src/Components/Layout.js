import React from 'react';
import Navigation from './Navigation/NavigationItems';
import './Layout.css';
const layout = (props)=>(
    <div>
        <Navigation />
        <main>{props.children}</main>
        <footer>Developed by <a href="https://www.BilelJribi.tn">Bilel Jribi</a></footer>
    </div>
)

export default layout;