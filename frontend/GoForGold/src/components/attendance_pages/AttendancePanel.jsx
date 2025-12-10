import {Button, Row, Col, Form, Table} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function AttendancePanel() {
    const [selectedActivity, setSelectedActivity]=useState("");
    const [activities, setActivities] = useState([]);
    const [dates, setDates]=useState([]);
    const [attendanceData, setAttendanceData]=useState([]);

    const [selectedDate, setSelectedDate]=useState(new Date());
    const selectDate = (date) => {
        setSelectedDate(date);
        const sunday = new Date(date);
        sunday.setDate(date.getDate() - date.getDay());
        setSundayDate(sunday);
    };
    

    function formatYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const [sundayDate,setSundayDate]=useState(()=> {
        const currentDate = new Date();
        const sunday = new Date();
        sunday.setDate(currentDate.getDate()-currentDate.getDay());
        return sunday;
    })

    

    const fetchActivities = async() => {
        const response = await axios.get("http://localhost:3001/facultymoderators/activities", 
            {withCredentials: true});
        setActivities(response.data);
        if (response.data.length) setSelectedActivity(response.data[0].activity_moderating_id);
        console.log(response.data)
    };

    // const fetchAttendance = async() => {
    //     const response = await axios.get("http://localhost:3001/attendance/attendancedata",
    //         {params: {startDate: formatYYYYMMDD(sundayDate),
    //         activity_id: selectedActivity
    //     }}, {
    //         withCredentials:true
    //     });
    //     setDates(response.data.dates);
    //     setAttendanceData(response.data.attendanceData);
    //     console.log(response.data);
    // };
    
    // useEffect(() => {
    //     fetchActivities();
    // }, []);
    
    useEffect(()=> {
        if (selectedActivity) fetchAttendance();
    }, [selectedActivity,sundayDate]);


    const handleCheckboxChange = async (student_id, date, oldValue, idx) => {
        const newValue = !oldValue;

        // Update local state so UI changes immediately
        setAttendanceData(prev =>
            prev.map(student =>
                student.student_id === student_id
                    ? {
                          ...student,
                          attendance: student.attendance.map((val, i) =>
                              i === idx ? newValue : val
                          )
                      }
                    : student
            )
        );

        // Send update to server
        try {
            await axios.post(
                "http://localhost:3001/attendance/update-attendance",
                {
                    student_id,
                    activity_id: selectedActivity,
                    date,
                    value: newValue
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };

    const subtractToSunday=async()=> {
        setSundayDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate()-7);
            return newDate;
        }
        )
    }

    const addToSunday=async()=> {
        setSundayDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate()+7);
        return newDate;
        }
        )
    }

return (
    <div>
        <Row>
            <Col md={3}>
                <Form.Select 
                    className="mb-3"
                    value={selectedActivity} 
                    onChange={(e)=> setSelectedActivity(Number(e.target.value))}>
                    {activities.map((act)=> (
                        <option key={act.activity_moderating_id} value={act.activity_moderating_id}>
                            {act.Activity.activity_name}
                        </option>
                    ))}
                </Form.Select>
            </Col>
            <Col>
                <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    selected={selectedDate}
                    onChange={selectDate}
                />
            </Col>
            
        </Row>
    <div className="panel">
        
        <Row className="mb-3">
            <Col className="d-flex align-items-center justify-content-center gap-3">
                <Button variant="dark" size="sm" onClick={()=> subtractToSunday()}>
                    {'<'}
                </Button>

                    <h3 className="m-0">Week of {dates[0]}</h3>
 
                 <Button variant="dark" size="sm" onClick={()=> addToSunday()}>
                    {'>'}
                </Button>
            </Col>
        </Row>
        
        <Row>
            <Table bordered striped>
            <thead>
                <tr>
                <th>Student</th>
                {dates.map(date => (
                    <th key={date}>{date}</th>
                ))}
                </tr>
            </thead>

            <tbody>
                {attendanceData.map(student => (
                <tr key={student.student_id}>
                    <td>{student.first_name} {student.last_name}</td>

                    {student.attendance.map((value, idx) => (
                    <td key={idx}>
                        <input type="checkbox" checked={value} 
                            onChange={() =>
                                handleCheckboxChange(
                                    student.student_id,
                                    dates[idx],
                                    value,
                                    idx
                                )
                            } />
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </Table>
 
        </Row>
           </div>
     </div>
);
}