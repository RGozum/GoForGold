import {Button, Modal, Form, Row, Col} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import DatePicker from "react-datepicker";

import './AddCategoryPop.css';

export default function YearsEditPanel({year_id, refreshYears}) {
    const [show, setShow] = useState(false);
    const [selectedStartDate, setStartDate] = useState([]);
    const [selectedEndDate, setEndDate] = useState([]);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedEndDate);
        console.log(selectedStartDate);
        if (selectedEndDate<selectedStartDate) {
            alert("Your end date occurs before your start date!");
            return;
        }
        if (selectedEndDate==selectedStartDate) {
            alert("Your end date and start date are the same!");
            return;
        }
        await axios.put(`http://localhost:3001/schoolyears/${year_id}/editdates`, 
            {start_date: selectedStartDate, 
        end_date: selectedEndDate}, {withCredentials: true});
        handleClose();
    };

    const selectStartDate = (date) => {
        setStartDate(date);
    };

    const selectEndDate = (date) => {
        setEndDate(date);
    };

    const fetchYear = async(year_id) => {
        try {
            const response = await axios.get(`http://localhost:3001/schoolyears/${year_id}`, {withCredentials: true});
            setStartDate(response.data.start_date);
            selectEndDate(response.data.end_date);
        } catch(err) {
            alert(err.response.data.message);
            handleClose();
        }
        
    };
    
    useEffect(() => {
        fetchYear(year_id);
    }, []); 


    return (
        <>
        <Button variant="dark" size="lg" onClick={handleShow} className="ms-5">
            Edit Year
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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
                        Edit Year's Dates
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        
    );
}