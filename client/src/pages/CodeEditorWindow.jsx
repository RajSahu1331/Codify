import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Stubs from "../DefaultStub";
import moment from "moment";
import FileUploadButton from "../components/FileUploadButton";
import { Editor } from "@monaco-editor/react";

const MonacoEditorWrapper = ({ value, onChange, language }) => {
  return (
    <Editor
      height="300px" // Set the default height
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
    />
  );
};


const CodeEditorWindow = () => {
  const [editorValue, setEditorValue] = useState(" // Write your code here...");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState("");
  const [jobID, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [trueOutput, setTrueOutput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [executionTime, setExecutionTime] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [verdict,setVerdict] = useState("");


  const navigate = useNavigate();

  const { slug } = useParams();
  console.log("itemSlug:", slug);



  useEffect(() => {
    async function fetchData() {
      try {
        let problem = await axios.post("/problem", { slug });
        console.log("problem", problem);
        setTitle(problem.data.title);
        setDescription(problem.data.description);
        setInputFormat(problem.data.inputFormat);
        setConstraints(problem.data.constraint);
        setSampleOutput(problem.data.output);
        setSampleInput(problem.data.input)
        setTrueOutput(problem.data.output);
        setUserInput(sampleInput);
        console.log("true fetched output", trueOutput);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    const defalutLang = localStorage.getItem("Default-Lang") || "cpp";
    setLanguage(defalutLang);
  }, []);

  // useEffect(() => {
  //   setCode(Stubs[language]);
  // }, [language]);

  const setDefaultLanguage = () => {
    localStorage.setItem("Default-Lang", language);
  };

  // const renderTimeDetails = () => {
  //   if (!jobDetails) return "";
  //   // return JSON.stringify(jobDetails);
  //   let result = "";

  //   let { submittedAt, completedAt, startedAt } = jobDetails;
  //   submittedAt = moment(submittedAt).toString();
  //   completedAt = moment(completedAt).toString();
  //   startedAt = moment(startedAt).toString();

  //   result += `Submitted At : ${submittedAt}`;

  //   if (!startedAt || !completedAt) return result;

  //   let start = moment(startedAt);
  //   let end = moment(completedAt);
  //   let executionTime = end.diff(start, "seconds", true);

  //   result += `      Execution time : ${executionTime}s`;

  //   return result;
  // };

  const runClickHandler = async (e) => {

    e.preventDefault();
    try {
      setStatus("");
      setJobId("");
      setOutput("");
      setJobDetails(null);
      const formData = new FormData();
      formData.append("language", language);
      formData.append("code", code);
      formData.append("file", selectedFile);
      formData.append("userInput", customInput);
      const { data } = await axios.post("/run", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the appropriate content type
        },
      });

      // console.log("Compiled data", data);
      setCustomOutput("Compiling...");
      // setOutput(data.jobId);
      setJobId(data.jobId);

      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get("/status", {
          params: { id: data.jobId },
        });

        const { success, job, error } = dataRes;

        console.log("Output", dataRes);

        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          // setJobDetails(job);
          // setStatus(jobStatus);
          console.log(jobOutput);
          if (jobStatus === "pending") return;
          // if (jobOutput === trueOutput) setOutput("Correct Answer");
          // else
          // setOutput(
          //   `Wrong Answer, \n Correct answer is ${trueOutput}, \n Your answer is ${jobOutput}`
          // );
          setCustomOutput(jobOutput);
          // navigate('/submission',{ state: { jobOutput, trueOutput } }); 
          clearInterval(intervalId);
        } else {
          setStatus("Error please try again !");
          console.error(error);
          clearInterval(intervalId);
          setOutput(error);
        }

        console.log("first", dataRes);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        console.log(errMsg);
        setOutput(errMsg);
      } else setOutput("Error connecting to server");
    }

  }

  const clickHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("language", language);
      formData.append("code", code);
      formData.append("file", selectedFile);
      formData.append("userInput", sampleInput);
      const { data } = await axios.post("/run", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the appropriate content type
        },
      });

      console.log("Compiled data", data);
      setOutput("Compiling...");
      // setOutput(data.jobId);
      setJobId(data.jobId);

      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get("/status", {
          params: { id: data.jobId },
        });

        const { success, job, error } = dataRes;

        console.log("Output", dataRes);

        if (success) {
          let { status: jobStatus, output: jobOutput } = job;
          setJobDetails(job);
          setStatus(jobStatus);
          // setVerdict(jobOutput);
          console.log(jobOutput);
          if (jobStatus === "pending") return;
          else {
            setOutput(jobOutput)
            if (jobOutput === trueOutput) setOutput("Correct Answer");
            else
              setOutput(`Wrong Answer, \n Correct answer is ${trueOutput}, \n Your answer is ${jobOutput}`);
            navigate('/submission', { state: { jobOutput, trueOutput, slug, title, language } });
          }
          clearInterval(intervalId);
        } else {
          setStatus("Error please try again !");
          console.error(error);
          clearInterval(intervalId);
          setOutput(error);
        }

        console.log("first", dataRes);
        setIsSubmitting(false);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        console.log(errMsg);
        setOutput(errMsg);
        setIsSubmitting(false);
      } else setOutput("Error connecting to server");
    }
  };


  // const submissionsClickHandler = (e)=>{
  //   let jobOutput = verdict;
  //   e.preventDefault();
  //   console.log("jeja",jobOutput);
  //   console.log("jeja",trueOutput);
  //   navigate('/submission',{ state: { jobOutput, trueOutput, slug, title, language } });
  // }

  return (
    <>
      <div className="flex justify-between">
        {/* Left Half (Problem Description) */}
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-semibold">{title}</h1>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p>{description}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">InputFormat</h2>
            <p>{inputFormat}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Constraints</h2>
            <p>{constraints}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Input</h2>
            <p>{sampleInput}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Output</h2>
            <p>{sampleOutput}</p>
          </div>

        </div>

        {/* Right Half (Language Selector, Code Editor, Input, and Output) */}
        <div className="w-1/2 p-4">
          {/* Language Selector and Set Default Button */}
          <div className="mb-4">
            <label htmlFor="language-select" className="block text-gray-700 text-sm font-bold mb-2">
              Select Language
            </label>
            <div className="relative">
              <select
                id="form-control language-select"
                className="w-md p-2 border rounded-md"
                value={language}
                onChange={(e) => {
                  let response = window.confirm(
                    "WARNING: Changing the language will change the saved code"
                  );
                  if (response) setLanguage(e.target.value);
                }}
              >
                <option value={"cpp"}>C++</option>
                <option value={"py"}>Python</option>
                <option value={"java"}>Java</option>
              </select>
              <button
                className="absolute -mt-2.5 mx-3 top-2 bg-blue-500 text-white px-2 py-2 rounded-md"
                onClick={setDefaultLanguage}
              >
                Set Default
              </button>
              {/* <div className="mx-20">
              <button className="absolute -mt-2.5 mx-20 top-2 bg-red-500 text-white px-2 py-2 rounded-md" onClick={submissionsClickHandler}>
                Submissions
              </button>
              </div> */}
              <FileUploadButton
                onFileSelected={(file) => setSelectedFile(file)}
              />
            </div>
          </div>

          {/* Code Editor (Monaco Editor) */}
          <div className="mb-4">
            <label htmlFor="code-editor" className="block text-gray-700 text-sm font-bold mb-2">
              Code Editor
            </label>
            <MonacoEditorWrapper
              language={language}
              value={editorValue}
              onChange={(newValue) => {
                setEditorValue(newValue);
                setCode(newValue); // Update the code state with the editor content
              }}
            />
          </div>

          {/* Input and Output Textareas (Side by Side) */}
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="input-text" className="block text-gray-700 text-sm font-bold mb-2">
                Input
              </label>
              <textarea
                id="input-text"
                className="w-full h-20 p-2 border rounded-md"
                placeholder="Input text..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              ></textarea>
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="output-text" className="block text-gray-700 text-sm font-bold mb-2">
                Output
              </label>
              <textarea
                id="output-text"
                className="w-full h-20 p-2 border rounded-md"
                placeholder="Output text..."
                readOnly
                value={customOutput}
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success mt-1"
            onClick={clickHandler}
          // disabled={isSubmitting} 
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-success mt-1 mx-20"
            onClick={runClickHandler}
          >
            Run
          </button>
        </div>
      </div>
    </>
  );
};

export default CodeEditorWindow;
