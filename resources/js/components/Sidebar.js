import React from 'react';

export default function Sidebar(props) {
    return (
        <ul className="nav nav-tabs">
            {Object.keys(props.tabs).map((key,index) => {
                return (
                    <li key={index} className='nav-item site-menu-item course-sidebar-item' onClick={e => props.setTab(key)}>
                        <a className={`nav-link py-1 ${props.activeTab == key ? 'active' : ''}`}>{key}</a>
                    </li>
                )
            })}
        </ul>
    );
}