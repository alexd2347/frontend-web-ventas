// src/components/Layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';
import './Layout.css';

function Layout() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="main-grid">
            <SideBar />
            <div className="content contenedor-horizontal-arriba-centro">
                <Outlet />
            </div>
            {/*<div className="footer">Derechos reservados &copy; {}</div>*/}
        </div>
    );
};

export default Layout;
