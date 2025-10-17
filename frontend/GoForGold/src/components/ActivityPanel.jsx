import axios from 'axios';
import {useState, useEffect} from "react";
import './ScrollablePanel.css';

export default function ScrollablePanel() {
const [activities, setActivities] = useState([]);
const [newActivity, setNewActivity] = useState("");


// Get categories 
const fetchActivities = async() => {
    const response = await axios.get("http://localhost:3001/activities");
    setActivities(response.data);
};

 useEffect(() => {
        fetchActivities();
}, []);

// Add category

// const addCategory = async () => {
//     if (!newActivity.trim()) return;
//     const response = await axios.post("http://localhost:3001/activities", {
//       activity_name: newActivity,
      
//       active: true,
//     });
//     setCategories((prev) => [...prev, response.data]);
//     setNewCategory("");
//   };


//Archive category
const archiveActivity = async(activity_id) => {
    const response = await axios.put(`http://localhost:3001/activities/${activity_id}/archive`);
    const updatedActivity = response.data;

setActivities((prevActivities) =>
    prevActivities.map((act) =>
    act.activity_id === updatedActivity.activity_id ? updatedActivity : act)); };


    return (
        <div className="container">
            <h3 className="title">Activities</h3>

            {/* <div className="input-container">
                <input 
                    type="text"
                    placeholder="New category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="input" />
                <button onClick={() => addCategory()} className="add-button">
                    Add
                </button>
            </div> */}

            <div className="panel">

            <ul style={{padding: 0, margin: 0, listStyle:"none"}}>
                {activities.map((act) => (
                    <li key={act.activity_id} className="scroll-item">
                        <span 
                            className={`${act.active ? "item-active" : "item-inactive"}`}>
                            {act.activity_name}
                        </span>
                        <div style={{ display: "flex", gap: "8px"}}>
                            <button onClick={() => archiveActivity(act.activity_id)} className="archiveButton">
                                &times;
                            </button>
                        </div>
                </li>
                ))}
               
            </ul>
        </div>
        </div>
    );
}