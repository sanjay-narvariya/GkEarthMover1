
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBackward } from "react-icons/fa";
import { postData, getData,serverURL } from "../services/FetchNodeAdminServices";
import testingimage from "./Brand-icon.png"

export default function CategoryForm() {

  const { categoryid } = useParams(); // Get categoryid from URL
  const [categoryName, setCategoryName] = useState('');
  const [details, setDetails] = useState('');
  const [categoryIcon, setCategoryIcon] = useState({ bytes: "", fileName: testingimage });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
 

  const imgStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "2rem",
};


  // Fetch category details if editing
  useEffect(() => {
    if (categoryid) {
      fetchCategoryDetails();
    }
  }, [categoryid]);

  const fetchCategoryDetails = async () => {
    var result = await getData(`category/get-category/${categoryid}`, {});
    if (result.status) {
       setCategoryName(result.data.categoryname);
       setDetails(result.data.details);
       setCategoryIcon({ bytes: result.data.categoryimage, fileName: `${serverURL}/${result.data.categoryimage}`})
    
    } else {
      setMessage({ type: 'error', text: 'Failed to fetch category details!' });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
                  let formData = new FormData();
                  formData.append("categoryname", categoryName);
                  formData.append("details", details);
                  formData.append("categoryimage", categoryIcon.bytes);
                 

      if (categoryid) {
        // Update existing category
        // formData.append("categoryid", categoryid);
        var result = await postData(`category/update-category-with-picture/${categoryid}`, formData);
        console.log("FormData contents:");
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        
      } else {
        // Add new category
        var result = await postData('category/category-submit', formData)
        
      }

      if (result.status) {
        setMessage({ type: 'success', text: categoryid ? 'Category updated successfully!' : 'Category added successfully!' });
        setTimeout(() => navigate('/home'), 1000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Something went wrong!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to the server!' });
    } finally {
      setLoading(false);
    }
  };






  return (

    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-lg p-4">
        <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
         {categoryid? <h5 className="mb-0">Update Category</h5> :<h5 className="mb-0">Add New Category</h5> }
          <Link to="/home" className="text-light">
            <FaBackward className='fs-4' />
          </Link>
        </div>
        <div className="card-body">
          {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="categoryname" className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="categoryname"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                // required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="details" className="form-label">Category Details</label>
              <input
                type="text"
                className="form-control"
                id="details"
                placeholder="Enter category details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                // required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label fw-bold'>Category Icon</label>
              <input type="file" className="form-control" onChange={(e) => setCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })} />
              {categoryIcon.fileName != testingimage ? <img style={imgStyle} src={categoryIcon.fileName} alt="Product Preview" /> : <img style={imgStyle} src={categoryIcon.fileName} alt="Product Preview" />}
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
}




