import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Submission = () => {
  const location = useLocation();
  const { jobOutput, trueOutput, slug, title, language } = location.state;
  const [submissions, setSubmissions] = useState([]);

  // if(jobOutput===undefined && trueOutput===undefined)return;

  console.log("job",jobOutput);
  console.log("true",trueOutput);

  useEffect(() => {
    if (jobOutput !== undefined && trueOutput !== undefined) {
      async function sendData() {
        try {
          let submitProblem = await axios.post("/submitProblem", {
            jobOutput,
            trueOutput,
            slug,
            title,
            language,
          });
          console.log("send data", submitProblem);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      sendData();

    }
  }, [jobOutput, trueOutput, slug, title, language]);



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/getSubmissions", { params: { slug } });
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [slug]);

  return (
    <div>
      <div className="container p-4">
        <div className="d-flex justify-content-between list-group-item">
          <h3 className="fw-bold">Title</h3>
          <h3 className="fw-bold">Language</h3>
          <h3 className="fw-bold">Verdict</h3>
        </div>

        <ol className="list-group">
          {submissions.map((submission, index) => (
            <li className="d-flex justify-content-between align-items-center mb-2 list-group-item">
              <div>
                <h6>{title}</h6>
              </div>
              <div>
                <h6>
                  {/* <Link
                  to={`/problems/${item.slug}`}
                  className="fw-bolder text-decoration-none text-capitalize p-3"
                >
                  {item.title}
                </Link> */}
                  {submission.language}
                </h6>
              </div>
              <div>
                {submission.status === "Accepted" && (
                  <h6>✅{submission.status}</h6>
                )}
                {submission.status === "Wrong" && (
                  <h6>❌{submission.status}</h6>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Submission;
