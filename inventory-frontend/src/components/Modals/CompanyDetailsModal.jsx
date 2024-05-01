import React from 'react';
import PropTypes from 'prop-types';


export const CompanyDetailsModal = ({ isOpen, onClose, company }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Detalles de la Empresa</h2>
                <p><strong>Nombre:</strong> {company.name}</p>
                <p><strong>Ciudad:</strong> {company.city}</p>
                <p><strong>País:</strong> {company.country}</p>
                <p><strong>Teléfono:</strong> {company.phone}</p>
                <p><strong>Email:</strong> {company.email}</p>
                <p><strong>Sitio web:</strong> {company.website}</p>
            </div>
        </div>
    );
};

CompanyDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    company: PropTypes.object
};

