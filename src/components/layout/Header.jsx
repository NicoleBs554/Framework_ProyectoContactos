import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ viewVersion, setViewVersion, onNewContact }) => {
  const { logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-title">
        <h1>📒 Contactos</h1>
        <p>Administra tu libreta de contactos desde un solo lugar.</p>
      </div>
      <div className="header-actions">
        <select value={viewVersion} onChange={(e) => setViewVersion(e.target.value)}>
          <option value="V1">Vista Simple</option>
          <option value="V2">Vista Detallada</option>
          <option value="V3">Vista Minimalista</option>
          <option value="V4">Tarjeta Interactiva</option>
        </select>
        <button type="button" className="btn-primary" onClick={onNewContact}>
          + Nuevo
        </button>
        <button type="button" className="btn-secondary" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
