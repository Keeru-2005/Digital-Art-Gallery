// photography.jsx
import React from 'react';
import './App.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h4>Filter by price</h4>
            <button className="filter-button">Filter</button>

            <h4>Select by Styles</h4>
            <ul>
                <li><input type="checkbox" /> Nature</li>
                <li><input type="checkbox" /> Landscape</li>
                <li><input type="checkbox" /> Portraits</li>
                <li><input type="checkbox" /> Sports</li>
                <li><input type="checkbox" /> Pets</li>
                <li><input type="checkbox" /> City</li>
            </ul>

            <h4>Select by Size</h4>
            <ul>
                <li><input type="checkbox" /> Portrait</li>
                <li><input type="checkbox" /> Landscape</li>
            </ul>
        </div>
    );
}

function Photography() {
    return (
        <div className="container">
            <Sidebar />
            <div className="gallery">
                <div className="gallery-item">
                    <img src="example1.jpg" alt="Art 1" />
                </div>
                <div className="gallery-item">
                    <img src="example2.jpg" alt="Art 2" />
                </div>
                <div className="gallery-item">
                    <img src="example3.jpg" alt="Art 3" />
                </div>
                <div className="gallery-item">
                    <img src="example4.jpg" alt="Art 4" />
                </div>
                {/* Add more gallery items as needed */}
            </div>
        </div>
    );
}

export default Photography;
