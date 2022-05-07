import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CHIRON
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex search-form">
            <i className="fa-solid fa-magnifying-glass search-fa-icon"></i>
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="search anything"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="nav-profile-card">
          <img
            height={50}
            src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
            alt=""
          />
          <div className="user-info">
            <span>Jaskaran</span>
            <small>Role</small>
          </div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
