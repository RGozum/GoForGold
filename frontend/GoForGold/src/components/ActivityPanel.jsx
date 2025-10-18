import {Button, Form} from 'react-bootstrap';

import {React, useEffect, useState} from 'react';
import axios from 'axios';

import AddActivityPop from './admin_pages/AddActivityPop';

import './ScrollablePanel.css';

export default function ActivityPanel({categories, onAddActivity, globalActivities, refreshActivities}) {
const [activities, setActivities] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("")


const fetchActivities = async (cat_id) => { 
    if (!cat_id) return; 
    const response = await axios.get("http://localhost:3001/activities", {
        params: {category_id: cat_id},
    });
    setActivities(response.data);
};


useEffect(() => {
    if (categories.length >0 && selectedCategory === "") {
        setSelectedCategory(categories[0].category_id);
    }
}, [categories]);

useEffect(() => {
    if (!selectedCategory) return;
    fetchActivities(selectedCategory);
}, [selectedCategory]);

useEffect(() => {
    if (!selectedCategory) return;
    fetchActivities(selectedCategory);
}, [globalActivities]);


const archiveActivity = async (activity_id) => {
  const response = await axios.put(`http://localhost:3001/activities/${activity_id}/archive`);
  const updatedActivity = response.data;

  setActivities((prevActivities) =>
  prevActivities.map((act) =>
    act.activity_id === updatedActivity.activity_id ? updatedActivity : act));
}

return (
    <div>
    <div className="scrollable-panel">
    <h3 className="title">Activities</h3>

    <AddActivityPop categories={categories}
    onAdd={onAddActivity} />

    <Form.Select value={selectedCategory} onChange={(e)=> setSelectedCategory(Number(e.target.value))} className="mb-2">
        <option value="">Select a category</option>
        {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
            </option>
        ))}
    </Form.Select>
    {activities.length===0 ? (<p>No activities found.</p>) : (
    <ul className="ul-style">
        {activities.map((act) => (
            <li key = {act.activity_id} className="scroll-item">
                <span className={`${act.active ? "active" : "inactive"}`}>
                    {act.activity_name}
                </span>
                    <Button variant="dark" size="sm" onClick={() => archiveActivity(act.activity_id)} className="button">
                    &times;
                </Button>            
            </li>
        ))}
    </ul>
)}
  </div>
  </div>
);
}