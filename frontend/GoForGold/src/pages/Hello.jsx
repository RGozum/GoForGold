import {Container, Row, Col} from 'react-bootstrap';
import {useState, useEffect} from "react";
import axios from 'axios';


import AdminHeader from "../components/admin_pages/AdminHeader.jsx";
import './Hello.css';
import AdminScrollablePanel from "../components/admin_pages/AdminScrollablePanel.jsx";
import ActivityPanel from "../components/admin_pages/ActivityPanel.jsx";
import UsersComponent from '../components/admin_pages/UsersComponent.jsx';

export default function Hello() {
const [categories, setCategories] = useState([]);
const [activities, setActivities] = useState([])

const fetchCategories = async() => {
    const response = await axios.get("http://localhost:3001/categories");
    setCategories(response.data);
}
const fetchActivities = async() => {
  const response = await axios.get("http://localhost:3001/activities");
  setActivities(response.data);
}

useEffect(( ) => {
    fetchCategories();
    fetchActivities();
}, []);

const addActivity = async(activityName, cat_id) => {
    const response=await axios.post("http://localhost:3001/activities", {
        activity_name: activityName,
        category_id: cat_id,
    }, {withCredentials: true});
    fetchActivities(cat_id);
}


const archiveCategory = async(category_id) => {
    const response = await axios.put(`http://localhost:3001/categories/${category_id}/archive`, {},
      {withCredentials: true});
    const updatedCategory = response.data;

setCategories((prevCategories) =>
    prevCategories.map((cat) =>
    cat.category_id === updatedCategory.category_id ? updatedCategory : cat)); 
};

const addCategory = async (name) => {
    if (!name.trim()) return;
    const response = await axios.post("http://localhost:3001/categories", {
      category_name: name,
      active: true,
    }, {withCredentials: true});
    setCategories((prev) => [...prev, response.data]);
  };

    return (
      
      <div>

        <Container fluid="md">
          <Row className="mb-4"> 
            <AdminHeader /> 
            </Row>
        <Row className="mb-3">
          <Col><AdminScrollablePanel categories={categories} onToggleActive ={archiveCategory} onAddCategory={addCategory}/>
          </Col>
          <Col> <ActivityPanel
              categories={categories}
              onAddActivity={addActivity}
              globalActivities={activities}
            />
          </Col>
        </Row>
        <Row><UsersComponent className="mb-3"/>
        </Row>


      </Container>
      </div>
    );
}
