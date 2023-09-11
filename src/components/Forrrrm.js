import React, { useState , useEffect } from "react";
import "../App.css";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteFromTable,
  addPost,
  updatePost,
} from "../Redux/Slices/postsSlice";

function Forrrrm() {
  
  const [ids, setIds] = useState(null);
  const [fname, setFname] = useState("");
  const [updatefname, setUpdatedFname] = useState("");

  const [lname, setLastname] = useState("");
  const [updatelname, setUpdatedLastname] = useState("");

  const [email, setEmail] = useState("");
  const [updatedemail, setUpdatedEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [updatedphone, setUpdatedPhone] = useState("");

  const [isedit, setisEdit] = useState(false);
  const [id, setId] = useState(null);

  const [isFormComplete, setIsFormComplete] = useState(false);
  useEffect(() => {
    if (fname && lname && email && phone) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [fname, lname, email, phone]);
  

  const [errors , setErrors] = useState([])
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate()
    setErrors(errors)
    if(Object.keys(errors).length === 0 ){
      alert("Done")
    }
  }
  const validate = ()=>{
    const error = {}
    if(!email)
    {
      error.email = "Email is Required"
    }else if(!/\S+@\S+\.\S+/.test(email)){
      error.email = "Email Not Matched"
    }else{
      error.email = ""
    }

    if(!lname)
    {
      error.email = "Last Name is Required"
    }else if(lname.length > 8){
      error.lname = "Last Name Not Matched"
    }else{
      error.lname = ""
    }

    return error
  }

  return (
    <div className="t">
      <h1 className="text-center bg-dark p-2 text-light ">CURD OPERATION</h1>
      <Container>
        <form onSubmit={handleSubmit} className=" ">
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form6Example1">
                  First name
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  class="form-control"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form6Example2">
                  Last name
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  class="form-control"
                  onChange={(e) => setLastname(e.target.value)}
                />
                            {errors.lname && <div className="error">{errors.lname}</div>}

              </div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="form6Example5">
              Email
            </label>
            <input
              type="email"
              id="form6Example5"
              class="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="form6Example6">
              Phone
            </label>
            <input
              type="number"
              id="form6Example6"
              class="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            class="btn btn-dark btn-block mb-4 text-center w-100"
            disabled={!isFormComplete}
            onClick={() => {
              dispatch(
                addPost({ id: posts.length + 1, fname, lname, email, phone })
              );
              setEmail("");
              setFname("");
              setLastname("");
              setPhone("");
              
            }}
          >
            Add Post
          </button>
        </form>

        <Table striped bordered responsive hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0
              ? posts.map((post) => (
                  <tr key={post.id}>
                    <td className="text-center">{post.id}</td>
                    <td className="text-center">{post.fname}</td>
                    <td className="text-center">{post.lname}</td>
                    <td className="text-center"> {post.email}</td>
                    <td className="text-center"> {post.phone}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-primary me-2  "
                        style={{ width: "100px" }}
                        onClick={() => {
                          setisEdit(true);
                          setId(post.id);
                          setIds(post.id);
                          console.log(ids);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger w-40"
                        style={{ width: "100px" }}
                        onClick={() =>
                          dispatch(DeleteFromTable({ id: post.id }))
                        }
                      >
                        Delete
                      </button>

                      {isedit && id == post.id && (
                        <>
                          <form onSubmit={handleSubmit} className=" ">
                            <div class="row mb-4">
                              <div class="col">
                                <div class="form-outline">
                                  <label class="form-label" for="form6Example1">
                                    First name
                                  </label>
                                  <input
                                    type="text"
                                    id="form6Example1"
                                    class="form-control"
                                    onChange={(e) =>
                                      setUpdatedFname(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div class="form-outline">
                                  <label class="form-label" for="form6Example2">
                                    Last name
                                  </label>
                                  <input
                                    type="text"
                                    id="form6Example2"
                                    class="form-control"
                                    onChange={(e) =>
                                      setUpdatedLastname(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="form-outline mb-4">
                              <label class="form-label" for="form6Example5">
                                Email
                              </label>
                              <input
                                type="email"
                                id="form6Example5"
                                class="form-control"
                                onChange={(e) =>
                                  setUpdatedEmail(e.target.value)
                                }
                              />
                            </div>

                            <div class="form-outline mb-4">
                              <label class="form-label" for="form6Example6">
                                Phone
                              </label>
                              <input
                                type="number"
                                id="form6Example6"
                                class="form-control"
                                onChange={(e) =>
                                  setUpdatedPhone(e.target.value)
                                }
                              />
                            </div>

                            <button
                              type="submit"
                              class="btn btn-success btn-block mb-4 text-center w-100"
                              onClick={() => {
                                dispatch(
                                  updatePost({
                                    id: post.id,
                                    fname: updatefname,
                                    lname: updatelname,
                                    email: updatedemail,
                                    phone: updatedphone,
                                  })
                                );
                                setisEdit(false);
                              }}
                            >
                              Update
                            </button>
                          </form>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              :  <h1 className="text-danger" style={{margin:"15px auto" , fontSize:"30px" , fontWeight:"700"}}>Not Found</h1>}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Forrrrm;
