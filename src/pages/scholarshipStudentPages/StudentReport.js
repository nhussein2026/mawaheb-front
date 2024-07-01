import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StudentReport = ({ reportId, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    courseId: "",
    noteId: "",
    difficultiesId: "",
    userAchievementId: "",
    eventId: "",
    date_of_report: "",
    certificateId: "",
  });
  const [options, setOptions] = useState({
    courses: [],
    notes: [],
    difficulties: [],
    userAchievements: [],
    events: [],
    certificates: [],
  });
  const [creatingNew, setCreatingNew] = useState({
    course: false,
    note: false,
    difficulty: false,
    userAchievement: false,
    event: false,
    certificate: false,
  });

  const [newItems, setNewItems] = useState({
    course: { title: '', description: '', course_image: '' },
    note: { title: '', description: '' },
    difficulty: { title: '', description: '' },
    userAchievement: { title: '', description: '', category: '', achievement_image: '' },
    event: { title: '', description: '', photo: '' },
    certificate: { title: '', description: '', certificate_image: '', certificate_link: '' },
  });

  const [message, setMessage] = useState(""); // Message state for user feedback
  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/studentReports/options`,
          {
            headers: { 
            "Content-Type": "application/json",
              Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleNewItemChange = (e, itemType) => {
    const { name, value } = e.target;
    setNewItems((prevItems) => ({
      ...prevItems,
      [itemType]: { ...prevItems[itemType], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        reportId
          ? `${process.env.REACT_APP_API_URL}/studentReport/${reportId}`
          : `${process.env.REACT_APP_API_URL}/studentReport`,
        {
          method: reportId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      onSave(data);
      setMessage(reportId ? "Report updated successfully!" : "Report created successfully!");
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  const handleCreateNewItem = async (itemType) => {
    const endpoint = itemType === "difficulty" ? "difficulties" : `${itemType}s`
    console.log("this is endpoints: ", endpoint)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newItems[itemType]),
        }
      );
      const newItem = await response.json();
      setOptions((prevOptions) => ({
        ...prevOptions,
        [`${itemType}s`]: [...prevOptions[`${itemType}s`], newItem],
      }));
      setForm((prevForm) => ({
        ...prevForm,
        [`${itemType}Id`]: newItem._id,
      }));
      setCreatingNew((prevCreatingNew) => ({
        ...prevCreatingNew,
        [itemType]: false,
      }));
      setNewItems((prevNewItems) => ({
        ...prevNewItems,
        [itemType]: itemType === 'note' ? { title: '', description: '' } : { title: '', description: '', course_image: '', category: '', achievement_image: '', photo: '', certificate_image: '', certificate_link: '' },
      }));
    } catch (error) {
      console.error(`Error creating new ${itemType}:`, error);
    }
  };

   // Pluralization map
   const pluralMap = {
    course: "courses",
    note: "notes",
    difficulty: "difficulties",
    userAchievement: "userAchievements",
    event: "events",
    certificate: "certificates",
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-12">
       {message && (
        <div className="mb-4 text-green-600">
          {message}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      {['course', 'note', 'difficulty', 'userAchievement', 'event', 'certificate'].map((itemType) => (
        <div key={itemType} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 capitalize">{itemType}</label>
          {creatingNew[itemType] ? (
            <>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newItems[itemType].title}
                onChange={(e) => handleNewItemChange(e, itemType)}
                className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newItems[itemType].description}
                onChange={(e) => handleNewItemChange(e, itemType)}
                className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {itemType === 'course' && (
                <input
                  type="text"
                  name="course_image"
                  placeholder="Course Image URL"
                  value={newItems.course.course_image}
                  onChange={(e) => handleNewItemChange(e, 'course')}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
              {itemType === 'certificate' && (
                <>
                  <input
                    type="text"
                    name="certificate_image"
                    placeholder="Certificate Image URL"
                    value={newItems.certificate.certificate_image}
                    onChange={(e) => handleNewItemChange(e, 'certificate')}
                    className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  <input
                    type="text"
                    name="certificate_link"
                    placeholder="Certificate Link"
                    value={newItems.certificate.certificate_link}
                    onChange={(e) => handleNewItemChange(e, 'certificate')}
                    className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </>
              )}
              {itemType === 'userAchievement' && (
                <>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newItems.userAchievement.category}
                    onChange={(e) => handleNewItemChange(e, 'userAchievement')}
                    className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  <input
                    type="text"
                    name="achievement_image"
                    placeholder="Achievement Image URL"
                    value={newItems.userAchievement.achievement_image}
                    onChange={(e) => handleNewItemChange(e, 'userAchievement')}
                    className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </>
              )}
              {itemType === 'event' && (
                <input
                  type="text"
                  name="photo"
                  placeholder="Event Photo URL"
                  value={newItems.event.photo}
                  onChange={(e) => handleNewItemChange(e, 'event')}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
              <button
                type="button"
                onClick={() => handleCreateNewItem(itemType)}
                className="mt-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Save New {itemType}
              </button>
              <button
                type="button"
                onClick={() => setCreatingNew((prev) => ({ ...prev, [itemType]: false }))}
                className="mt-2 ml-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="mt-1 flex items-center">
              <select
                name={`${itemType}Id`}
                value={form[`${itemType}Id`]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Select a {itemType}</option>
                {options[pluralMap[itemType]] && options[pluralMap[itemType]].map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setCreatingNew((prev) => ({ ...prev, [itemType]: true }))}
                className="mt-2 text-blue-500 hover:text-mutedGold"
              >
                Create New {itemType}
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date of Report</label>
        <input
          type="date"
          name="date_of_report"
          value={form.date_of_report}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-gold text-white hover:bg-mutedGold px-4 py-2 rounded-md"
      >
        {reportId ? 'Update' : 'Create'} Report
      </button>
    </form>
  );
};

export default StudentReport;
