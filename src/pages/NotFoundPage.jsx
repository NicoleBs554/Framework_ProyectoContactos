import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <Link to="/contacts" className="btn-primary">
          Volver a contactos
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
