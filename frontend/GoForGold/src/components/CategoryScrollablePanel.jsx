import axios from 'axios';
import {useState, useEffect} from "react";
import './ScrollablePanel.css';

export default function ScrollablePanel() {
const [categories, setCategories] = useState([]);
const [newCategory, setNewCategory] = useState("");


// Get categories 
const fetchCategories = async() => {
    const response = await axios.get("http://localhost:3001/categories");
    setCategories(response.data);
};

 useEffect(() => {
        fetchCategories();
}, []);

// Add category

const addCategory = async () => {
    if (!newCategory.trim()) return;
    const response = await axios.post("http://localhost:3001/categories", {
      category_name: newCategory,
      active: true,
    });
    setCategories((prev) => [...prev, response.data]);
    setNewCategory("");
  };


//Archive category
const archiveCategory = async(category_id) => {
    const response = await axios.put(`http://localhost:3001/categories/${category_id}/archive`);
    const updatedCategory = response.data;

setCategories((prevCategories) =>
    prevCategories.map((cat) =>
    cat.category_id === updatedCategory.category_id ? updatedCategory : cat)); };


    return (
        <div className="container">
            <h3 className="title">Categories</h3>

            <div className="input-container">
                <input 
                    type="text"
                    placeholder="New category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="input" />
                <button onClick={() => addCategory()} className="add-button">
                    Add
                </button>
            </div>

            <div className="panel">

            <ul style={{padding: 0, margin: 0, listStyle:"none"}}>
                {categories.map((cat) => (
                    <li key={cat.category_id} className="scroll-item">
                        <span 
                            className={`${cat.active ? "item-active" : "item-inactive"}`}>
                            {cat.category_name}
                        </span>
                        <div style={{ display: "flex", gap: "8px"}}>
                            <button onClick={() => archiveCategory(cat.category_id)} className="archiveButton">
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