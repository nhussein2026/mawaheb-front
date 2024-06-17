import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import noPic from '../assets/images/No-profile-pic.jpg';

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  console.log(certificates)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    certificate_link: '',
    certificate_image: null,
  });
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/certificates`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setError('Failed to load certificates');
      }
    };

    fetchCertificates();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/certificates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      const data = await response.json();
      setCertificates([...certificates, data.certificate]);
      setFormData({
        title: '',
        description: '',
        certificate_link: '',
        certificate_image: null,
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      setError('Failed to create certificate');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/certificates/${selectedCertificate._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      const data = await response.json();
      setCertificates(certificates.map((cert) => (cert._id === data.updatedCertificate._id ? data.updatedCertificate : cert)));
      setFormData({
        title: '',
        description: '',
        certificate_link: '',
        certificate_image: null,
      });
      setSelectedCertificate(null);
    } catch (error) {
      console.error('Error updating certificate:', error);
      setError('Failed to update certificate');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/certificates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCertificates(certificates.filter((cert) => cert._id !== id));
      } else {
        setError('Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
      setError('Failed to delete certificate');
    }
  };

  const handleEdit = (certificate) => {
    setSelectedCertificate(certificate);
    setFormData({
      title: certificate.title,
      description: certificate.description,
      certificate_link: certificate.certificate_link,
      certificate_image: null,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-darkGray font-bold mb-6">Certificates</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl text-darkGray font-semibold mb-4">
          {selectedCertificate ? 'Edit Certificate' : 'Create Certificate'}
        </h2>
        <form onSubmit={selectedCertificate ? handleUpdate : handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Certificate Link</label>
            <input
              type="url"
              name="certificate_link"
              value={formData.certificate_link}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Certificate Image</label>
            <input
              type="file"
              name="certificate_image"
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-darkGray text-white rounded-md hover:bg-gray-700"
          >
            {selectedCertificate ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <div key={certificate._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${certificate.certificate_image}`}
              alt={certificate.title}
              className="w-full h-48 object-cover rounded-md mb-4"
              // onError={(e) => (e.target.src = {noPic})}
            />
            <h3 className="text-xl text-darkGray font-semibold mb-2">{certificate.title}</h3>
            <p className="text-gray-600 mb-4">{certificate.description}</p>
            <a
              href={certificate.certificate_link}
              className="text-blue-500 hover:underline mb-4 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate
            </a>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(certificate)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(certificate._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
