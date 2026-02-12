import {Button, Modal, Form} from "react-bootstrap";
import React, {useState} from 'react';

import DatePicker from "react-datepicker";

import './AddCategoryPop.css';


export default function AddYearPop() {
    const [show, setShow] = useState(false);
    const [selectedStartDate, setStartDate] = useState([]);
    const [selectedEndDate, setEndDate] = useState([]);
    const [yearName, setYearName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setYearName("");
        setShow(true); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!yearName.trim()) return;
        await yearAdd(yearName, selectedStartDate,selectedEndDate);
        setYearName("");
        handleClose();
    };

    const yearAdd = async(yearName, selectedStartDate, selectedEndDate) => {
        const response = await axios.post("http://localhost:3001/schoolyears/newyear", {
            name: yearName, start_date: selectedStartDate, end_date: selectedEndDate
        }, {withCredentials: true});
        console.log(response.data())
    }

    const selectStartDate =  (date) => {
        setStartDate(date);
    };

    const selectEndDate = (date) => {
        setEndDate(date);
    };

    return (
        <>
        <Button variant="dark" size="sm" onClick={handleShow} className="add-button">
            + Add Year
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Create New Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* <Form.Group controlId="formCategoryName">
                        <Form.Label>Category Name</Form.Label> 
                        <Form.Control type="text" 
                        placeholder="Enter category name" 
                        value={categoryName || ""}
                        onChange={(e)=> setCategoryName(e.target.value)} />
                    </Form.Group> */}
                    <Button variant="success" type="submit" className="mt-3 w-100">
                        Add Year
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}