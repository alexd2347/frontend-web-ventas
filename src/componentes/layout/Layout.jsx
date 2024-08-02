// src/components/Layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';
import './Layout.css';

function Layout () {
    return (
        <div className="main-grid">
            <SideBar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout
