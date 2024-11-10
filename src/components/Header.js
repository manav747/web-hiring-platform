import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Job Hiring Platform</h1>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/candidates">Candidates</Link>
        <Link to="/assessments">Assessments</Link>
      </nav>
    </header>
  );
};

export default Header;
