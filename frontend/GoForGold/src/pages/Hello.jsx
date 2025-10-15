import './Hello.css';
import axios from 'axios';
import {useState, useEffect} from "react";
import AdminHeader from "../components/AdminHeader.jsx";



export default function Hello() {
    const [categories, setCategories] = useState([]);

    const fetchAPI = async() => {
        const response = await axios.get("http://localhost:3001/categories");
        console.log(response.data);
        setCategories(response.data);
    }

  useEffect(() => {
    fetchAPI();
  }, []);
    return (
        <div>
            <AdminHeader />
            {categories.map((cat) => (
                <div key={cat.category_index}>
                    <p>{cat.category_name}</p>
                </div>
                ))}
        </div>
    );
}