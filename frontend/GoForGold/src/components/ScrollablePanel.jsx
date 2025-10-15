import React from 'react';
import axios from 'axios';
import {useState, useEffect} from "react";
import './ScrollablePanel.css';

export default function ScrollablePanel() {
const [categories, setCategories] = useState([]);
const [newCategory, setNewCategory] = useState("");

    const fetchCategories = async() => {
        const response = await axios.get("http://localhost:3001/categories");
        setCategories(response.data);
    };

    

     useEffect(() => {
            fetchCategories();
    }, []);

    return (
        <div>
            <h3 className="title">
                Categories
            </h3>
            <ul>
                {categories.map((cat) => (
                <li key={cat.category_index} className="category">
                    <span className="line">
                    {cat.category_name}
                    </span>
                    <div className="gap"></div>
                    
                </li>
                ))}
               
            </ul>
        </div>
    );
}