import React, {useState, useEffect, useRef} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap";
import axios from "axios";
import Papa from "papaparse";


export default function HonorDash() {
    const [honorRows, setHonorRows] = useState([]);

    const [students, setStudents]=useState([]);
    const [honorRoll, setHonorRoll]=useState([]);
    const [grade, setGrade]=useState([]);

    const quarters = [1, 2, 3, 4];
    const fileInputRef = useRef(null);

    const fetchStudents = async() => {
    const response = await axios.get("http://localhost:3001/users", 
        {withCredentials: true,
        params: {user_role_id: 3},
    });
    setStudents(response.data);
    }

    const fetchHonorRoll = async() => {
        const response = await axios.get("http://localhost:3001/honorroll",
            {withCredentials: true}
        );
        setHonorRoll(response.data);

    }

    const fetchGrades = async() => {
        const response = await axios.get("http://localhost:3001/studentgrades",
            {withCredentials: true}
        );
        setGrade(response.data);
    }

    useEffect(()=> {
        fetchStudents();
        fetchHonorRoll();
        fetchGrades();
    }, []);

    const handleChange=(index, field, value) => {
        const updated=[...honorRows];
        updated[index][field]=value;

        if (field === "first_name" || field === "last_name") {
            const first_name= updated[index].first_name.trim().toLowerCase();
            const last_name=updated[index].last_name.trim().toLowerCase();

            const matchedStudent = students.find(
                (s) =>
                    (s.first_name ||"").toString().trim().toLowerCase() === first_name &&
                    (s.last_name || "").toString().trim().toLowerCase() === last_name
            ); 
            updated[index].student_id=matchedStudent ? Number(matchedStudent.user_id) : "";

        }
        setHonorRows(updated);

    };

    const handleRemoveRow = (index) => {
        const updated = honorRows.filter((_, i) => i !== index);
        setHonorRows(updated);
    };

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsedRows = results.data.map((row) => {
                    const firstNameFromCSV = (row.first_name|| "").toString().trim().toLowerCase();
                    const lastNameFromCSV = (row.last_name || "").toString().trim().toLowerCase();
                    const typeFromCSV = (row.type || "").toString().trim().toLowerCase();
                    const gradeFromCSV = Number(row.year_grade);
                    const quarterFromCSV = Number(row.quarter);
 

                    const matchedStudent = students.find(
                        (s) =>
                            (s.first_name ||"").toString().trim().toLowerCase() === firstNameFromCSV &&
                            (s.last_name || "").toString().trim().toLowerCase() === lastNameFromCSV
                    );                
                
                    const matchedHonor = honorRoll.find((h)=> 
                        (h.type|| "").toString().trim().toLowerCase() === typeFromCSV
                    );

                    const matchedGrade = grade.find(
                        (g) => Number(g.year_grade)===gradeFromCSV
                    );

                    const validQuarter = quarters.includes(quarterFromCSV)
                
                return {
                    student_id: matchedStudent ? Number(matchedStudent.user_id) : "",
                    honor_roll_id: matchedHonor ? Number(matchedHonor.honor_roll_id) : "",
                    quarter: validQuarter ? Number(quarterFromCSV) : "",
                    grade_id: matchedGrade ? Number(matchedGrade.grade_id) : "",
                    
                    first_name: row.first_name || "",
                    last_name: row.last_name || "",
                    type: row.type || "",
                    grade: gradeFromCSV || ""

                };
                });
            setHonorRows(parsedRows);
            },
         });
    };

    const validateRow = (row) => {
        return (
            row.student_id && row.honor_roll_id && row.grade_id && row.quarter
        );
    }

    const allValid = honorRows.length > 0 && honorRows.every(validateRow)

    const handleSubmit = async (e) => {
            try {
                e.preventDefault();
                await axios.post("http://localhost:3001/honorlist/bulk", {honorList: honorRows}, {withCredentials: true});
                alert("Honor Roll created successfully!");
                setHonorRows([]);
            } catch (err) {
                console.error("Error creating honor roll:", err);
                alert("There was an error adding students' points.");
            }
        };

    return (
        <Container fluid="md" className="panel">
            <Col className="d-flex align-items-center">
                <h3>Honor Roll</h3>
                <Button className="ms-auto mb-2" onClick={() => fileInputRef.current.click()}>Import list</Button>

                <Form.Control
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleCSVUpload}
                style={{display:"none"}} />
                </Col>
            <Form>
                {honorRows.map((honor,index)=> (
                    <Row key={index} className="align-items-center mt-2">
                        <Col md={2}>
                            <Form.Control 
                                type="text"
                                placeholder="First Name"
                                value={honor.first_name || ""}
                                onChange={(e)=> handleChange(index, "first_name", e.target.value)}
                                isInvalid={!honor.student_id}
                           />
                        </Col>

                        <Col md={2}>
                            <Form.Control 
                                type="text"
                                placeholder="Last Name"
                                value={honor.last_name || ""}
                                onChange={(e)=> handleChange(index, "last_name", e.target.value)}
                                isInvalid={!honor.student_id}

                            />
                        </Col>

                        <Col md={2}>
                            <Form.Select 
                                value={honor.honor_roll_id || ""}
                                onChange={(e)=> handleChange(index, "honor_roll_id", e.target.value)}
                                isInvalid={!honor.honor_roll_id}

                                >
                                <option value="">Select Honor Roll</option>
                                {honorRoll.map(h => (
                                    <option key={h.honor_roll_id} value={h.honor_roll_id}>
                                        {h.type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={2}>
                            <Form.Select 
                                value={honor.grade_id || ""}
                                onChange={(e)=> handleChange(index, "grade_id", e.target.value)}
                                isInvalid={!honor.grade_id}
                            >
                                <option value="">Grade</option>
                                {grade.map(g => (
                                    <option key={g.grade_id} value={g.grade_id}>
                                        {g.year_grade}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={2}>
                            <Form.Select 
                                value={honor.quarter || ""}
                                onChange={(e)=> handleChange(index, "quarter", e.target.value)}
                                isInvalid={!honor.quarter}
                            >
                                <option value="">Quarter</option>
                                {quarters.map(q => (
                                    <option key={q} value={q}>
                                        Quarter {q}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={2} className="text-end">
                            <Button
                                variant="danger"
                                onClick={() =>handleRemoveRow(index)} 
                                disabled={honorRows.length===1}>
                                Remove
                                </Button>
                                </Col>
                    </Row>
                ))}
                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" onClick={handleSubmit} disabled={!allValid}>
                            Submit All
                        </Button>
                    </Col>
                </Row>
            </Form>
            
        </Container>
    )
}