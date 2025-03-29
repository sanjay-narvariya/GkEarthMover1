import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postData, getData } from "../services/FetchNodeAdminServices";
import { IoMdAddCircle } from 'react-icons/io';
import { serverURL } from "../services/FetchNodeAdminServices";

export default function Enquiry() {
       const [enquiryList, setEnquiryList] = useState([]);
         const navigate = useNavigate();

           let newArray = [...enquiryList].reverse(); // Spread operator se original array safe rahega

          // Fetch all Enquiries
           const fetchAllEnquiry = async () => {
             const result = await getData('enquiry/get-all-enquiry');
             if (result.status) {
              setEnquiryList(result.data.enquiry);
             } else {
               alert(result.message);
             }
           };
         
           useEffect(() => {
             fetchAllEnquiry();
           }, []);
         
         

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-lg">
        <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Enquiry</h5>
          {/* <Link to="" className="text-light">
            <IoMdAddCircle className="fs-3" />
          </Link> */}
        </div>
        <div className="card-body">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
            {newArray.map((item,i) => {
                     
                 let date = new Date(item.createdAt);
                var newformat =  date.toLocaleString(); // Local time format me convert karega

            return(  <tr key={item._id}>
                <td>{i}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className='Enquiry-Message' >{item.address}</td>
                <td>{newformat}</td>
              </tr>
            )
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
