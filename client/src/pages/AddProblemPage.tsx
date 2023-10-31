import React, {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProblemPage = () => {

    const navigate = useNavigate();
    const [problemDetail, setProblemDetail] = useState({
        slug:"",
        title:"",
        difficulty:"",
        description:"",
        inputFormat: "",
        constraint:"",
        input: "",
        output: ""
      });

      const clickHandler = async ()=>{  
  
      const slug = problemDetail.slug;
      const title = problemDetail.title;
      const difficulty = problemDetail.difficulty;
      const description = problemDetail.description;
      const inputFormat = problemDetail.inputFormat;
      const constraint = problemDetail.constraint;
      const input = problemDetail.input;
      const output = problemDetail.output


      try{
        const array = await axios.post('/add',{slug,title,difficulty,description,inputFormat,constraint,input,output});
        console.log(array);
        navigate('/')
      }
      catch(err){
         console.log(err);
         
      }
    }

    return (
        <>
     <div className="max-w-4xl mx-auto font-mono my-4">
        <h1 className="text-4xl">
          Create Problem
        </h1>
          <p className="text-sm italic text-gray-500 my-2">
            Get started by providing the initial details needed to create a
            problem.
          </p>
        </div>


      {/* kjdfggvks */}


      <div className="mt-8 space-y-9">
          <div className="flex">
            <p className="w-48 ">Problem Slug</p>
            <input
              value={problemDetail.slug}
              onChange={(e) =>
                setProblemDetail({ ...problemDetail, slug: e.target.value })
              }
              type="text"
              className="flex-grow outline-none border-2 border-gray-400 p-2 rounded-sm shadow"
              required
              placeholder="Write problem slug. i.e problem123 (Should be unique)"
            />
          </div>
          <div className="flex">
            <p className="w-48 min-w-fit">Problem Name</p>
            <input
              value={problemDetail.title}
              onChange={(e) =>
                setProblemDetail({ ...problemDetail, title: e.target.value })
              }
              type="text"
              className="flex-grow outline-none border-2 border-gray-400 p-2 rounded-sm shadow"
              required
              placeholder="Write problem name"
            />
          </div>
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Difficulty</p>
            <textarea
              value={problemDetail.difficulty}
              onChange={(e) =>
                setProblemDetail({ ...problemDetail, difficulty: e.target.value })
              }
              rows={1}
              required
              className="flex-grow outline-none border-2 border-gray-400 p-2 rounded-sm shadow"
              placeholder="Write a short summary about the challange."
            />
          </div>


          <div className="flex items-start">
            <p className="w-48 min-w-fit">Description</p>
            <div className="flex-grow  max-w-[880px]">
              <MDEditor
                value={problemDetail.description}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, description: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>

          <div className="flex items-start">
            <p className="w-48 min-w-fit">Input Format</p>
            <div className="flex-grow  max-w-[880px]">
              <MDEditor
                value={problemDetail.inputFormat}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, inputFormat: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>
          
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Constraints</p>
            <div className="flex-grow  max-w-[880px]">
              <MDEditor
                value={problemDetail.constraint}
                onChange={(e) =>
                  setProblemDetail({
                    ...problemDetail,
                    constraint: e as string,
                  })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>

          
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Input</p>
            <div className="flex-grow  max-w-[880px]">
              <MDEditor
                value={problemDetail.input}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, input: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>

          <div className="flex items-start">
            <p className="w-48 min-w-fit">Output</p>
            <div className="flex-grow  max-w-[880px]">
              <MDEditor
                value={problemDetail.output}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, output: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>


          <button type="button" className="btn btn-success mt-3" onClick={clickHandler}>Submit</button> 
        </div>
        
        </>
    )
}

export default AddProblemPage;