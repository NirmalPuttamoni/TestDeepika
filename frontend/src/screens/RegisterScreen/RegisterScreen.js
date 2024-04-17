import React, { useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../actions/userActions';
import axios from 'axios';
import Loading from '../../components/Loading';
import {  useNavigate } from 'react-router-dom';
const RegisterScreen = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();


  useEffect(()=>
  {
    if(userInfo)
    {
      navigate("/mynotes");
    }
  },[navigate,userInfo])
  const submitHandler=async(e)=>
  {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password, pic));
  
  }
const postDetails=(pics)=>
{
  if(!pics)
  {
    return setPicMessage("please select an image")
  }
  setPicMessage(null)
  if(pics.type==='image/jpeg'|| pics.type==='image/png')
  {
    const data=new FormData();
    data.append('file',pics)
    data.append('upload_preset',"NoteZipperweb");
    fetch("https://api.cloudinary.com/v1_1/dxqisz3zw/image/upload" ,{
      method:"post",
      body:data,

    })
    .then((res) => 
    {

      console.log("Cloudinary response:", res); // Log the Cloudinary response here
      return res.json();



    })
    .then((data) => {
      console.log("Cloudinary data:", data); // Log the parsed JSON data here
      setPic(data.url.toString());

    })
    .catch((err) => {
      console.log(err);
    });

  }
  else{
    return setPicMessage("Please Select an Image");
  }
}

  return (
    <MainScreen title="REGISTER">
              <div className='loginContainer'>
           {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading/>} 
         <Form onSubmit={submitHandler} >

         <Form.Group className="mb-3" controlId="formGroupName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" value={name} placeholder="Enter name" 
      onChange={(e)=>setName(e.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formGroupEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" value={email} placeholder="Enter email" 
      onChange={(e)=>setEmail(e.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formGroupPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password"  value={password} placeholder="Password" 
      onChange={(e)=>setPassword(e.target.value)}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password"  value={confirmpassword} placeholder="Confirm Password" 
      onChange={(e)=>setConfirmPassword(e.target.value)}
      />
    </Form.Group>

    {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}


<Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
                type="file"

         onChange={(e) => postDetails(e.target.files[0])}


              label="Upload Profile Picture"
               />

      </Form.Group>
    <Button variant="primary" type="submit">
            Submit
          </Button>

    
  </Form>

  <Row className="py-3">
          <Col>
          Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>

    </MainScreen>
  )
}

export default RegisterScreen