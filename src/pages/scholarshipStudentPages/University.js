import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Semester from "./Semester";

const University = () => {
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSemester, setEditingSemester] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchUniversity();
    }
  }, [isLoggedIn, navigate]);

  const fetchUniversity = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/university/${user.universityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch university");
      }
      const data = await response.json();
      setUniversity(data.universityRecord);
      setSemesters(data.universityRecord.semesters);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateSemester = async (semester) => {
    const url = editingSemester
      ? `${process.env.REACT_APP_API_URL}/semester/${editingSemester._id}`
      : `${process.env.REACT_APP_API_URL}/university/${user.universityId}/semester`;
    const method = editingSemester ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(semester),
      });
      if (!response.ok) {
        throw new Error(
          editingSemester
            ? "Failed to update semester"
            : "Failed to add semester"
        );
      }
      setEditingSemester(null);
      fetchUniversity();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteSemester = async (semesterId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/semester/${semesterId}/${user.universityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete semester");
      }
      fetchUniversity();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mb-9">
      <h1 className="text-3xl font-bold mb-4">University Information</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div className="text-blue-500 mb-4">Loading...</div>
      ) : (
        <>
          {university && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {university.universityName}
              </h2>
              <p>Type: {university.universityType}</p>
              <p>Total GPA: {university.totalGPA.toFixed(2)}</p>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4">Semesters</h2>
         
          <table className="min-w-full bg-white border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Semester Number</th>
                <th className="py-2 px-4 border-b">Courses</th>
                <th className="py-2 px-4 border-b">GPA</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {university && university.semesters.length > 0 ? (
                university.semesters.map((semester) => (
                  <tr key={semester._id}>
                    <td className="border px-4 py-2">
                      {semester.semesterNumber}
                    </td>
                    <td className="border px-4 py-2">
                      {semester.courses.map((course) => (
                        <div key={course._id}>
                          {course.name} - {course.credits} credits
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2">
                      {semester.semesterGPA.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => setEditingSemester(semester)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSemester(semester._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No semesters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Semester
            onSubmit={handleAddOrUpdateSemester}
            initialData={editingSemester}
            onCancel={() => setEditingSemester(null)}
          />
        </>
      )}
    </div>
  );
};

export default University;
