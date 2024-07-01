import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SemesterDetails = () => {
  const { semesterId } = useParams();
  const [semester, setSemester] = useState({});

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/semester/${semesterId}`);
        const data = await response.json();
        setSemester(data);
      } catch (error) {
        console.error('Error fetching semester details:', error);
      }
    };
    fetchSemester();
  }, [semesterId]);

  return (
    <div>
      <h4>Semester {semester.semesterNumber}</h4>
      <ul>
        {semester.courses && semester.courses.map((course) => (
          <li key={course.courseCode}>
            {course.courseName}: {course.grade} (Credits: {course.credits})
          </li>
        ))}
      </ul>
      <p>Semester GPA: {semester.semesterGPA}</p>
    </div>
  );
};

export default SemesterDetails;
