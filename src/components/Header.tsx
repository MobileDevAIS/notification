import React from "react";
import { signOutUser } from "../firebase/handleFunction";

function Header() {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container">
        <span className="navbar-brand">Navbar</span>
        <form className="form-inline">
          <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={()=>signOutUser()}>
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
