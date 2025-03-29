import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("status",localStorage.getItem("isLoggedIn"))

  return isLoggedIn ? (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img src="/Brand-icon.png" style={{ height: "50px" }} alt="Brand Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  ) : (
    <div></div> // Empty div when not logged in
  );
}
  