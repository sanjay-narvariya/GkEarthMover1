import React, { useEffect, useState } from 'react';
import { getData, postData, serverURL } from "../../services/FetchNodeAdminServices";
import "./Equipment.css";
import { Link, useNavigate } from "react-router-dom";



const Equipment = () => {

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
 
  // const [subCategoriesMap, setSubCategoriesMap] = useState({});



  // Fetch all categories
  const fetchAllCategory = async () => {
    try {
      const result = await getData('category/get-all-category');

      if (result.status) {
        setCategoryList(result.data.categories);
      } else {
        console.error("Failed to fetch categories:", result.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchAllCategory();
  }, []);

  // Set default tab after data is fetched
  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedTab(categoryList[0].categoryname);
    }
  }, [categoryList]);

  // Filtered equipment data based on selected tab
  const filteredEquipmentData = categoryList.filter(
    (item) => item.categoryname === selectedTab
  );

  return (
    <>
      <div className="container RentalEquipment">
        <div className="row">
          <div className="equipment-title">
            <h3>Awesome Equipment</h3>
            <h1>Featured Rental Equipment</h1>
            <p>
              Our commitment to quality ensures that every piece of equipment we
              offer is maintained to the highest standards, delivering the
              performance needed on-site.
            </p>
          </div>

          {/* Tabs */}
          <div className="tab-section">
            {categoryList.map((item, i) => (
              <button
                key={item}
                className={`tab-btn ${selectedTab === item.categoryname ? "active" : ""}`}
                onClick={() => setSelectedTab(item.categoryname)}
              >
                {item.categoryname}
              </button>
            ))}
          </div>

          {/* Equipment Cards */}
          <div className="row m-0 p-0">
            {filteredEquipmentData.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="card equipment-card">
                  <div
                    className="equipment-img"
                    onClick={() => navigate(`/subEquipment/${item._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`${serverURL}/${item.categoryimage}`}
                      className="card-img-top"
                      alt={item.categoryname}
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{item.details}</h2>
                    <hr />
                     <h4 className="delivery-info">{item.categoryname}</h4> 
                  </div>
                  <div className="card-footer">
                    <Link to={`/subEquipment/${item._id}`}>
                      <button
                        className="reserve-btn"

                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Equipment;
