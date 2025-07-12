import React from 'react';
import './AccessStatusPage.css';

function AccessStatusPage({ isLoading = false, title, message, color, icon, flagUrl }) {
    return (
        <div className="status-page-container">
            <div className="status-card">
                {isLoading ? (
                    <div className="spinner"></div>
                ) : (
                    <i className={`fas ${icon} icon`} style={{ color }}></i>
                )}
                <h1 style={{ color: isLoading ? '#333' : color }}>{title}</h1>
                <p>{message}</p>
                {flagUrl && !isLoading && <img src={flagUrl} alt="Country Flag" className="flag" />}
            </div>
        </div>
    );
}

export default AccessStatusPage;