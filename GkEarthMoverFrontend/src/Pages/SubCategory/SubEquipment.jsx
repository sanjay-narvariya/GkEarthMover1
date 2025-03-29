import React, { useEffect, useState } from 'react';
import { getData, postData, serverURL } from "../../services/FetchNodeAdminServices";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const SubEquipment = () => {
  const { categoryId } = useParams();
  console.log('sssssssssssssss', categoryId)

  const [selectedProduct, setSelectedProduct] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);


  const [name1, setName1] = useState("");
  const [mailid, setMailid] = useState("");
  const [error, setError] = useState("");

  const [phoneno, setPhoneno] = useState("");
  const [message1, setMessage1] = useState("");

  const navigate = useNavigate();




  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);




  useEffect(() => {

    const fetchAllSubcategory = async () => {
      try {
        // categoryId ke hissab se subcategory database se data lena
        var result = await getData(`subcategory/get_subcategory_by_categoryid/${categoryId}`, {});
       
        if (result.status) {
          setSelectedProduct(result.data);
          // console.log('sssssssssssssss', result.data[0])

        } else {
          console.error("Failed to fetch categories:", result.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAllSubcategory();

  }, [categoryId])



  const openModal = (item) => {
    setSelectedEquipment(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEquipment(null);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setPhoneno(value);
    }
  };

  const handleChange1 = (e) => {
    const value = e.target.value;
    setMailid(value);

    // Email validation regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var result = await postData('enquiry/enquiry-submit', {
        name: name1,
        phone: phoneno,
        email: mailid,
        address: message1
      });

      if (result.status) {
        Swal.fire({
          title: "Good job!",
          text: "Inquiry sent successfully!",
          icon: "success",
        });

        // Reset form fields
        setName1("");
        setMailid("");
        setPhoneno("");
        setMessage1("");

        window.location.reload(); // Refresh the page after navigation
        // Close modal
        closeModal();
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {

      Swal.fire({
        title: "Error",
        text: "Network error. Please try again later.",
        icon: "error",
      });

    }
  };


  return (
    <>
      <div className="container RentalEquipment">
        <div className="row">
          <div className="equipment-title">
            <h3>More Model</h3>
          </div>

          {/* Equipment Cards */}
          <div className="row m-0 p-0">
            {selectedProduct.map((item,i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="card equipment-card">
                  <div className="equipment-img">
                    <img
                      src={`${serverURL}/${item.subcategoryimage}`}
                      className="card-img-top"
                      alt={item.subcategoryimage}
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{item.subcategoryimage}</h2>
                    <hr />
                    <h4 className="delivery-info">{item.details}</h4>
                    {/* <ul className="specs-list">
                      {equipment.specs.map((spec, index) => (
                        <h5 key={index}>{spec}</h5>
                      ))}
                    </ul> */}
                  </div>
                  <div className="card-footer">
                    <button
                      className="reserve-btn"
                      onClick={() => openModal(item)}
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal (Render only when modal is open) */}
      {isModalOpen && selectedEquipment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inner click
          >
            <h2>Reserve Equipment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Equipment Name:</label>
                <input
                  type="text"
                  value={selectedEquipment.subcategoryname}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Category Name:</label>
                <input
                  type="text"
                  value={selectedEquipment.parent_category_id.categoryname}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={phoneno}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={mailid}
                  onChange={handleChange1}
                  required
                  pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>

              <div className="form-group">
                <label>Address:</label>
                <textarea
                  type="text"
                  placeholder="Address"
                  value={message1} 
                  onChange={(e) => setMessage1(e.target.value)}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={closeModal}>
                  Close
                </button>
                <button type="submit">Confirm Reservation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubEquipment;
