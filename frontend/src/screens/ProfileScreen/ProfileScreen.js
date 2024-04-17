import React from 'react'
import MainScreen from '../../components/MainScreen'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { updateProfile } from '../../actions/userActions'
import Col from 'react-bootstrap/esm/Col'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
const ProfileScreen = ({location}) => {
  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

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
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    dispatch(updateProfile({ name, email, password, pic }));

    


  };

  return (
  <MainScreen title='EDIT PROFILE'>
    <div>
    <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
  <Form.Label>Confirm Password</Form.Label>
  <Form.Control
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  {/* Error message for password mismatch */}
  {passwordMismatch && (
    <ErrorMessage variant="danger">Passwords do not match</ErrorMessage>
  )}
</Form.Group>

              {" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}

{/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
                type="file"

         onChange={(e) => postDetails(e.target.files[0])}


              label="Upload Profile Picture"
               />

      </Form.Group> */}

      <Button type="submit" varient="primary" className="mb-3">
                Update
              </Button>

            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={pic} alt={name} className="profilePic" /> */}
          </Col>
        </Row>
    </div>
  </MainScreen>
  )
}

export default ProfileScreen