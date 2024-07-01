import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SemesterList = ({ studentId }) => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/semesters/${studentId}`);
        const data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }, [studentId]);

  return (
    <div>
      <h3>Semesters</h3>
      <ul>
        {semesters.map((semester) => (
          <li key={semester._id}>
            <Link to={`/semester/${semester._id}`}>Semester {semester.semesterNumber}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SemesterList;
