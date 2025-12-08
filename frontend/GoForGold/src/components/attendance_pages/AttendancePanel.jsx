import {Button, Row, Col, Form, Table} from 'react-bootstrap';

import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function AttendancePanel() {
    const [selectedActivity, setSelectedActivity]=useState("");
    const [activities, setActivities] = useState([]);
    const [attendance, setAttendance]=useState([]);
    const [dates, setDates]=useState([]);
    const [attendanceData, setAttendanceData]=useState([]);
    
    const fetchActivities = async() => {
        const response = await axios.get("http://localhost:3001/facultymoderators/activities", 
            {withCredentials: true});
        setActivities(response.data);
        if (response.data.length) setSelectedActivity(response.data[0].activity_id);
        console.log(response.data)
    }

    const fetchAttendance = async() => {
        const response = await axios.get("http://localhost:3001/attendance/attendancedata",
            {params: {startDate:"2025-12-03",
            activity_id:selectedActivity
        }}, {
            withCredentials:true
        });
        // setAttendance(response.data);
        setDates(response.data.dates);
        setAttendanceData(response.data.attendanceData);
        console.log(response.data);
    };
    
    useEffect(() => {
        fetchActivities();
    }, []);
    
    useEffect(()=> {
        if (selectedActivity) fetchAttendance();
    }, [selectedActivity]);

return (
    <div>
        <Row>
            <Col>
                <Form.Select 
                    className="mb-3"
                    value={selectedActivity} 
                    onChange={(e)=> setSelectedActivity(Number(e.target.value))}>
                    <option value="">Select an Activity</option>
                    {activities.map((act)=> (
                        <option key={act.activity_moderating_id} value={act.activity_moderating_id}>
                            {act.Activity.activity_name}
                        </option>
                    ))}
                </Form.Select>
            </Col>
            <Col>
                <Button className="mb-3">
                    Add Date
                </Button>
            </Col>
        </Row>
    <div className="panel">
        
        <table>
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
                        <input type="checkbox" checked={value} readOnly />
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>








         {/* <Table striped bordered>
            <thead>
                <tr>
                    <th>Student</th>
                    {dates.map(date => (
                        <th key={date}>{date}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                
            </tbody>
         </Table> */}
    
    </div>
     </div>
);
}