
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import { postData, getData,serverURL } from "../services/FetchNodeAdminServices";
import testingimage from "./Brand-icon.png"

export default function SubCategoryForm() {
  const { subcategoryid } = useParams(); // Get subcategoryid from URL

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [details, setDetails] = useState('');
   const [subCategoryIcon, setSubCategoryIcon] = useState({ bytes: "", fileName: testingimage });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();


  
  const imgStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "2rem",
};


  useEffect(() => {
    fetchCategories();
    if (subcategoryid) {
      fetchSubCategoryDetails();
    }
  }, [subcategoryid]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const result = await getData('category/get-all-category');
     
      if (result.status) {
        setCategories(result.data.categories);
      } else {
        setMessage({ type: 'error', text: 'Failed to load categories' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error while fetching categories' });
    }
  };

  // Fetch subcategory details if editing

  const fetchSubCategoryDetails = async () => {
    const result = await getData(`subcategory/get-subcategory/${subcategoryid}`, {});
       console.log(result.data.parent_category_id)
    if (result.status) {
      setSubCategoryName(result.data.subcategoryname);
      setDetails(result.data.details);
      setSelectedCategory(result.data.parent_category_id._id);
      setSubCategoryIcon({ bytes: result.data.subcategoryimage, fileName: `${serverURL}/${result.data.subcategoryimage}`})
    } else {
      setMessage({ type: 'error', text: 'Failed to fetch subcategory details!' });
    }
  };


  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!selectedCategory || !subCategoryName.trim() || !subCategoryIcon) {
    //   setMessage({ type: 'error', text: 'All fields are required!' });
    //   return;
    // }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {

                            let formData = new FormData();
                          formData.append("subcategoryname", subCategoryName);
                          formData.append("parent_category_id", selectedCategory);
                          formData.append("subcategoryimage", subCategoryIcon.bytes);
                          formData.append("details", details);
                        

      let result;
      if (subcategoryid) {
        // Update existing subcategory
        // formData.append("subcategoryid", subcategoryid);

        result = await postData(`subcategory/update-subcategory-with-picture/${subcategoryid}`, formData);

        console.log("FormData contents:");
        formData.forEach((value, key) => {
          console.log(key, value);
        });

      } else {
        // Add new subcategory
        result = await postData('subcategory/subcategory-submit', formData);
      }

      if (result.status) {
        setMessage({ type: 'success', text: subcategoryid ? 'Subcategory updated successfully!' : 'Subcategory added successfully!' });
        setTimeout(() => navigate('/subcategory'), 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to process request' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-lg">
        <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{subcategoryid ? 'Update Sub Category' : 'Add Sub Category'}</h5>
          <Link to="/subcategory" className="text-light">
            <FaBackward className="fs-4" />
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
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Sub Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter sub category name"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                // required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="details" className="form-label">Sub Category Details</label>
              <input
                type="text"
                className="form-control"
                id="details"
                placeholder="Enter subcategory details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                // required
              />
            </div>

              <div className='mb-3'>
                <label className='form-label fw-bold'>Sub Category Icon</label>
                <input type="file" className="form-control" onChange={(e) => setSubCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })} />
                 {subCategoryIcon.fileName != testingimage ? <img style={imgStyle} src={subCategoryIcon.fileName} alt="Product Preview" /> : <img style={imgStyle} src={subCategoryIcon.fileName} alt="Product Preview" />}
                 </div>
                        
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Submitting...' : subcategoryid ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}














// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate ,useParams} from 'react-router-dom';
// import { FaBackward } from 'react-icons/fa';
// import { postData, getData } from "../services/FetchNodeAdminServices";


// export default function SubCategoryForm() {

//    const { subcategoryid } = useParams(); // Get categoryid from URL
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
  
//   const [subCategoryName, setSubCategoryName] = useState('')
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const navigate = useNavigate();




//    // Fetch subcategory details if editing
//    useEffect(() => {
//     if (subcategoryid) {
//       fetchSubCategoryDetails();
//     }
//   }, [subcategoryid]);

//   const fetchSubCategoryDetails = async () => {
//     const result = await postData('subcategory/display_subcategory_id',{subcategoryid: subcategoryid});
//     if (result.status) {
//       setSubCategoryName(result.data[0].subcategoryname);
//       setSelectedCategory(result.data[0].categoryid);
//       console.log('xxxxxxxxxxxxxxxxxxx',result.data[0].categoryid);
//     } else {
//       setMessage({ type: 'error', text: 'Failed to fetch category details!' });
//     }
//   };








//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         var result=await getData('category/display_all_category')
        
//         if (result) {
//           setCategories(result.data)
//         } else {
//           setMessage({ type: 'error', text: 'Failed to load categories' });
//         }
//       } catch (error) {
//         setMessage({ type: 'error', text: 'Server error while fetching categories' });
//       }
//     };

//     fetchCategories();
//   }, []);



//   // Handle form submission
// const handleSubmit = async (e) => {
//      e.preventDefault(); // Prevent page reload

//     if (!selectedCategory || !subCategoryName.trim()) {
//       setMessage({ type: 'error', text: 'All fields are required!' });
//       return;
//     }

//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       var result= await postData('subcategory/subcategory_submit',{categoryid:selectedCategory,subcategoryname:subCategoryName})

//       if (result) {
//         setSubCategoryName('');
//         setSelectedCategory('');
//         setMessage({ type: 'success', text: 'Subcategory added successfully!' });
//         setTimeout(() => navigate('/subcategory'), 2000); // Redirect after 2 seconds
//       } else {
//         setMessage({ type: 'error', text: result.message || 'Failed to add subcategory' });
//       }
//     } catch (error) {
//       setMessage({ type: 'error', text: 'Server error. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg border-0 rounded-lg">
//         <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
//           <h5 className="mb-0">Sub Category</h5>
//           <Link to="/subcategory" className="text-light">
//             <FaBackward className="fs-4" />
//           </Link>
//         </div>
//         <div className="card-body">
//           {message.text && (
//             <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
//               {message.text}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Category</label>
//               <select
//                 className="form-select"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 required
//               >
//                 <option value="1">Choose Category</option>
//                 {categories.map((category) => (
//                   <option key={category.categoryid} value={category.categoryid}>
//                     {category.categoryname}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Sub Category Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter sub category name"
//                 value={subCategoryName}
//                 onChange={(e) => setSubCategoryName(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-success w-100" disabled={loading}>
//               {loading ? 'Submitting...' : 'Submit'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }








// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaBackward } from 'react-icons/fa';

// // export default function SubCategoryForm() {
// //   return (
// //     <div className="container mt-5">
// //       <div className="card shadow-lg border-0 rounded-lg">
// //         <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
// //           <h5 className="mb-0">Sub Category</h5>
// //           <Link to="/home" className="text-light">
// //             <FaBackward className="fs-4" />
// //           </Link>
// //         </div>
// //         <div className="card-body">
// //           <form>
// //             <div className="mb-3">
// //               <label className="form-label">Category</label>
// //               <select className="form-select">
// //                 <option selected>Choose Category</option>
// //                 <option value="1">One</option>
// //                 <option value="2">Two</option>
// //                 <option value="3">Three</option>
// //               </select>
// //             </div>
// //             <div className="mb-3">
// //               <label className="form-label">Sub Category Name</label>
// //               <input type="text" className="form-control" placeholder="Enter sub category name" />
// //             </div>
// //             <button type="submit" className="btn btn-success w-100">Submit</button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }