import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createStudent, updateStudent, fetchStudentById } from '../redux/studentActions';

const ScholarshipStudentForm = ({ studentId }) => {
    const dispatch = useDispatch();
    const { student, loading, error } = useSelector(state => state.students);
    const [formData, setFormData] = useState({
        userId: '',
        country_of_studying: '',
        city: '',
        university: '',
        type_of_university: '',
        program_of_study: '',
        student_university_id: '',
        enrollment_year: '',
        expected_graduation_year: '',
    });

    useEffect(() => {
        if (studentId) {
            // dispatch(fetchStudentById(studentId));
        }
    }, [studentId, dispatch]);

    useEffect(() => {
        if (student) {
            setFormData(student);
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (studentId) {
            // dispatch(updateStudent({ id: studentId, ...formData }));
        } else {
            // dispatch(createStudent(formData));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for each form attribute */}
            <div>
                <label>Country of Studying</label>
                <input type="text" name="country_of_studying" value={formData.country_of_studying} onChange={handleChange} />
            </div>
            {/* Add more input fields as required */}
            <button type="submit">{studentId ? 'Update' : 'Create'} Student</button>
        </form>
    );
};

export default ScholarshipStudentForm;
