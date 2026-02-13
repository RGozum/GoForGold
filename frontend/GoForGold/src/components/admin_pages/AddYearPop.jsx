import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './AddCategoryPop.css';
import DatePicker from "react-datepicker";


export default function AddYearPop({refreshYears}) {
    const [show, setShow] = useState(false);
    const [selectedStartDate, setStartDate] = useState([]);
    const [selectedEndDate, setEndDate] = useState([]);
    const [yearName, setYearName] = useState("");

    const today = new Date();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setYearName("");
        setShow(true); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!yearName.trim()) return;
        if (selectedEndDate<selectedStartDate) {
            alert("Your end date occurs before your start date!");
            return;
        }
        if (selectedEndDate==selectedStartDate) {
            alert("Your end date and start date are the same!");
            return;
        }
        await yearAdd(yearName, selectedStartDate,selectedEndDate);
        setYearName("");
        handleClose();
    };

    const yearAdd = async(yearName, selectedStartDate, selectedEndDate) => {
        const response = await axios.post("http://localhost:3001/schoolyears/newyear", {
            name: yearName, start_date: selectedStartDate, end_date: selectedEndDate
        }, {withCredentials: true});
        console.log(response.data);
        refreshYears();
    }

    const selectStartDate =  (date) => {
        setStartDate(date);
    };

    const selectEndDate = (date) => {
        setEndDate(date);
    };

    useEffect(()=> {
        selectStartDate(today);
        setEndDate(today);
    },[]) 
    

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

                    <Form.Group controlId = "formYearName">
                        <Form.Label>Year Name</Form.Label>
                        <Form.Control type="text" 
                        required
                        placeholder="Starting Year - End Year"
                        value ={yearName || ""} 
                        onChange={(e)=> setYearName(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3 mt-3">
                        <Row>
                        <Col>
                        <Form.Label className="me-3">Start Date</Form.Label>
                        <DatePicker
                            showIcon
                            toggleCalendarOnIconClick
                            selected={selectedStartDate}
                            onChange={selectStartDate}
                        />
                        </Col>

                        <Col>
                        <Form.Label className="me-3">End Date</Form.Label>
                        <DatePicker
                            showIcon
                            toggleCalendarOnIconClick
                            selected={selectedEndDate}
                            onChange={selectEndDate}
                        />
                        </Col>
                     </Row>
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-3 w-100">
                        Add Year
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}