import React, {useState, useEffect} from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import YearsEditPanel from './YearsEditPanel.jsx';
import SetActivePanel from './SetActivePanel.jsx';
import AddYearPop from './AddYearPop.jsx';
import './ScrollablePanel.css'; 

export default function YearsPanel() {
    const [years, setYears]=useState([]);

    const fetchYears = async() => {
        const response = await axios.get('http://localhost:3001/schoolyears', {withCredentials: true});
        setYears(response.data);
    };

    useEffect(()=> {
        fetchYears();
    }, []);

    return (
        <div className="scrollable-panel-long">
            <h2 className='title'>Years</h2>
            <AddYearPop refreshYears={fetchYears} />
            <ul className="ul-style">
                {years.map((year)=> (
                    <li key={year.year_id} className={`${year.active ? "year-item-active" : "year-item-inactive"}`}>
                        <h3>{year.name}</h3>
                        <div>
                            <YearsEditPanel year_id={year.year_id}/>
                            <SetActivePanel year_id={year.year_id} refreshYears={fetchYears}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}