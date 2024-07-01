import React, { useState, useEffect } from "react";

const SemesterForm = ({ onSubmit, initialData, onCancel }) => {

  const [semesterNumber, setSemesterNumber] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [courseGrade, setCourseGrade] = useState("");
  const [courseEcts, setCourseEcts] = useState(""); // ECTS field
  const [courseLg, setCourseLg] = useState(""); // LG field
  const [semesterGPA, setSemesterGPA] = useState(""); // Semester GPA
  const [resultImage, setResultImage] = useState(""); // Result Image

  useEffect(() => {
    if (initialData) {
      setSemesterNumber(initialData.semesterNumber);
      setCourses(initialData.courses);
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setSemesterNumber("");
    setCourses([]);
    setCourseCode("");
    setCourseName("");
    setCourseCredits("");
    setCourseGrade("");
    setCourseEcts("");
    setCourseLg("");
    setSemesterGPA("");
    setResultImage("");
  };
  const addCourse = () => {
    setCourses([
      ...courses,
      {
        courseCode,
        name: courseName,
        credits: parseInt(courseCredits),
        grade: parseFloat(courseGrade),
        ects: parseInt(courseEcts), // ECTS field
        lg: courseLg, // LG field
      },
    ]);
    setCourseCode("");
    setCourseName("");
    setCourseCredits("");
    setCourseGrade("");
    setCourseEcts("");
    setCourseLg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      semesterNumber,
      courses,
    });
    resetForm();
  };
  console.log("these are the data of university submission: ", semesterNumber, courses)

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Semester" : "Add Semester"}
      </h2>
      {/* semester info */}
      <h3 className="text-lg font-semibold mb-2 text-darkRed">
        Semester Details
      </h3>
      <div className="bg-lightRed p-4 rounded mb-4">
        <div className="mb-4">
          <label className="block mb-2 text-white">Semester GPA</label>
          <input
            type="number"
            step="0.01"
            value={semesterGPA}
            onChange={(e) => setSemesterGPA(e.target.value)}
            className="p-2 border rounded w-full bg-lightGray"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white">Result Image URL</label>
          <input
            type="text"
            value={resultImage}
            onChange={(e) => setResultImage(e.target.value)}
            className="p-2 border rounded w-full bg-lightGray"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Semester Number</label>
          <input
            type="number"
            value={semesterNumber}
            onChange={(e) => setSemesterNumber(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
      </div>
      {/* course info */}
      <h3 className="text-lg font-semibold mb-2 text-darkRed">
        Course Details
      </h3>
      <div className="bg-lightGold p-4 rounded mb-4">
        <div className="mb-4">
          <label className="block mb-2">Course Code</label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Course Credits</label>
          <input
            type="number"
            value={courseCredits}
            onChange={(e) => setCourseCredits(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Course ECTS</label>
          <input
            type="number"
            value={courseEcts}
            onChange={(e) => setCourseEcts(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Course Grade</label>
          <input
            type="number"
            step="0.01"
            value={courseGrade}
            onChange={(e) => setCourseGrade(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Course LG</label>
          <select
            value={courseLg}
            onChange={(e) => setCourseLg(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select LG</option>
            <option value="AA">AA</option>
            <option value="AB">AB</option>
            <option value="BA">BA</option>
            <option value="BB">BB</option>
            <option value="CB">CB</option>
            <option value="CC">CC</option>
            <option value="DC">DC</option>
            <option value="DD">DD</option>
            <option value="FF">FF</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={addCourse}
        className="bg-green-500 text-white px-2 py-1 rounded mb-4 hover:bg-green-400"
      >
        Add Course
      </button>

      <div className="mb-4">
        <label className="block mb-2">Courses</label>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                {course.courseCode} - {course.name} - {course.credits} credits -{" "}
                {course.ects} ECTS - Grade: {course.grade} - LG: {course.lg}
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses added yet</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-gold text-white px-4 py-2 rounded mr-2 hover:bg-mutedGold"
      >
        {initialData ? "Update Semester" : "Add Semester"}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default SemesterForm;
