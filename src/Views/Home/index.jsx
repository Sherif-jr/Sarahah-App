import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center my-5">
      <h4>
        Sarahah allows you to receive constructive feedback from your friends
        and co-workers
      </h4>
      <div className="buttons d-flex justify-content-center align-items-center  flex-column">
        <Link to="auth/login" className="btn btn-default-outline my-4">
          <i className="fas fa-user"></i> Login
        </Link>
        <Link to="/auth/register" className="btn btn-default-outline">
          <i className="far fa-edit"></i> Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
