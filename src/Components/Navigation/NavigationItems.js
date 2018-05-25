import React from 'react';
import NavigationItem from './NavigationItem';
import './NavigationItems.css';

const navigationItems = ()=>(
    <nav>
        <ul>
            <li>✓ My Poll</li>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/new" >New Poll</NavigationItem>
            <NavigationItem link="/polls" >Polls</NavigationItem>
        </ul>
    </nav>
)
export default navigationItems;