import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const StudentReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/studentReports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        const data = await response.json();
        setReports(data.studentReports);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-11">
      <h1 className="text-2xl font-bold mb-6">Your Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report._id} className="p-4 border rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">{report.title}</h2>
              <p><strong>Date:</strong> {new Date(report.date_of_report).toLocaleDateString()}</p>
              <p><strong>Course:</strong> {report.courseId?.title || 'N/A'}</p>
              <p><strong>Note:</strong> {report.noteId?.title || 'N/A'}</p>
              <p><strong>Difficulty:</strong> {report.difficultiesId?.title || 'N/A'}</p>
              <p><strong>Achievement:</strong> {report.userAchievementId?.title || 'N/A'}</p>
              <p><strong>Event:</strong> {report.eventId?.title || 'N/A'}</p>
              <p><strong>Certificate:</strong> {report.certificateId?.title || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentReportList;
