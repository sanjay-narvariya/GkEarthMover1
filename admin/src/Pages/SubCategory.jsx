import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { postData, getData,serverURL } from "../services/FetchNodeAdminServices";

export default function SubCategory() {
    const navigate = useNavigate();
    const [subcategoryList, setSubcategoryList] = useState([]);
            
 
    
  const imgStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "2rem",
};

    /****************************** Fetch all categories **********************/
  /*  const fetchAllCategory = async () => {
        try {
            const result = await getData('category/display_all_category');
            if (result.status) {
                setCategoryList(result.data);
            } else {
                console.error("Failed to fetch categories:", result.message);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchAllCategory();
    }, []);
*/
    /****************************** Fetch all subcategories **********************/
    const fetchAllSubcategory = async () => {
        try {
            const result = await getData('subcategory/get-all-subcategory');
            if (result.status) {
                setSubcategoryList(result.data);
            } else {
                console.error("Failed to fetch subcategories:", result.message);
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    useEffect(() => {
        fetchAllSubcategory();
    }, []);

    /****************************** Delete Subcategory **********************/

const handleDelete = async (item) => {
        // var body={'subcategoryid':item}
 
      var result = await postData(`subcategory/delete-subcategory/${item}`, {})
      if (result.status) {
          alert("Subcategory deleted successfully",result);
          setTimeout(() => navigate('/subcategory'), 2000);
      } else {
          alert("Failed to delete subcategory: " + result.message);
      }
  
  fetchAllSubcategory(); // Refresh the list
};
    

    return (
       
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Sub Category Management</h5>
                    <Link to="/subcategoryform" className="text-light">
                        <IoMdAddCircle className="fs-3" />
                    </Link>
                </div>
                <div className="card-body">
                    <table className="table table-hover table-bordered text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Sub Category Name</th>
                                <th>Sub Category Details</th>
                                <th>Sub Category Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategoryList.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index}</td>
                                    <td>{item.parent_category_id.categoryname}</td>
                                    <td>{item.subcategoryname}</td>
                                    <td>{item.details}</td>
                                    <td>{item.subcategoryimage != "" ? <img style={imgStyle} src={`${serverURL}/${item.subcategoryimage}`} alt="Product Preview" /> : ""}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning text-light"
                                            onClick={() => navigate(`/subcategoryform/${item._id}`)}
                                        >
                                            <FaEdit className="fs-5" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FaTrashAlt className="fs-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
    );
}
