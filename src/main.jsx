import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from "react-router-dom"
import { CarritoProvider } from './carritoContext.jsx'
import { UserInfoProvider } from './userInfoContext.jsx'
import { ProductosDataProvider } from './productosDataContext'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <UserInfoProvider>
      <CarritoProvider>
        <ProductosDataProvider>
          <App />
        </ProductosDataProvider>
      </CarritoProvider>
    </UserInfoProvider>
  </HashRouter>
)
