import {Button} from 'react-bootstrap';

import React from 'react';
import AddCategoryPopUp from './AddCategoryPop.jsx';
import './ScrollablePanel.css';

export default function AdminScrollablePanel({categories, onToggleActive, onAddCategory }) {

return (
    <div>
    <div className="scrollable-panel">
    <h3 className="title">Categories</h3>

    <AddCategoryPopUp categoryAdd={onAddCategory}/>


    <ul className="ul-style">
        {categories.map((cat) => (
            <li key = {cat.category_id} className="scroll-item">
                <span className={`${cat.active ? "active" : "inactive"}`}>
                    {cat.category_name}
                </span>
                    <Button variant="dark" size="sm" onClick={() => onToggleActive(cat.category_id)} className="button">
                    &times;
                </Button>
                
 
            </li>


        ))}


    </ul>
  </div>
  </div>
);
}