import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default function AllProblems() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get("/problems");
        const fetchedData = response.data;
        // console.log("fetched",fetchedData[0]._id);
        setData(fetchedData);
        // console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
  <div className="container p-4">
    <div className="d-flex justify-content-between list-group-item">
      <h3 className="fw-bold">Slug</h3>
      <h3 className="fw-bold">Problem name</h3>
      <h3 className="fw-bold">Difficulty</h3>
    </div>

    <ol className="list-group">
      {data.map(item => (
        <li
          key={item._id}
          className="d-flex justify-content-between align-items-center mb-2 list-group-item"
        >
          <div>
            <h6>{item.slug}</h6>
          </div>
          <div>
            <h6>
              <Link
                to={`/problems/${item.slug}`}
                className="fw-bolder text-decoration-none text-capitalize p-3"
              >
                {item.title}
              </Link>
            </h6>
          </div>
          <div>
            {item.difficulty === "easy" && (
              <span className="badge rounded-pill bg-success">Easy</span>
            )}
            {item.difficulty === "medium" && (
              <span className="badge rounded-pill bg-warning">Medium</span>
            )}
            {item.difficulty === "hard" && (
              <span className="badge rounded-pill bg-danger">Hard</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  </div>
</div>

  );
}
