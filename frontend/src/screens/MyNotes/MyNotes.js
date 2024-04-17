import React, { useEffect,useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { listNotes } from '../../actions/notesActions';
import { deleteNoteAction } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({search}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const noteList=useSelector(state=>state.noteList)
  const { loading, error, notes } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;


  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler=(id)=>
  {
    if(window.confirm("Are you sure"))
    {
dispatch(deleteNoteAction(id))
    }
  };

  
  return (
    <MainScreen title={`welcome Back ${userInfo.name} ...`}>
      
      
<Link to='/createnote'>
  <Button style={{marginLeft:10,marginBottom:6}} size="lg">
    create new Note
    </Button>
    </Link>
    {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
{loading && <Loading/>}
{
notes?.reverse().filter(filterdNote=>(
  filterdNote.title.toLowerCase().includes(search.toLowerCase())
)).map(note=>(

  <Accordion key={note._id} defaultActiveKey="0">
          <Accordion.Item eventKey="0">
 <Card style={{margin:10}}>
      <Card.Header style={{display:"flex"}}>
        <span
          style={{
            color: "black",
            textDecoration: "none",
            flex: 1,
            cursor: "pointer",
            alignSelf: "center",
            fontSize: 18,
          }}
        
        
        >

         
<Accordion.Header  as={Card.Text} variant="link" eventKey="0">
          {note.title}
          </Accordion.Header>
         
        
       </span>
       
      <div>
        <Button href={`/note/${note._id}`}>Edit</Button>
        <Button variant="danger" className="mx-2" 
        onClick={()=>deleteHandler(note._id)}
        >Delete</Button>
        
      </div>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
      <Card.Body>
        <h4>
          <Badge bg="success">
           
Category- {note.category}
          </Badge>
        </h4>
        <blockquote className="blockquote mb-0">
          <p>
           {note.content}
          </p>
          <footer className="blockquote-footer">
          Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>

 </footer>
        </blockquote>
      </Card.Body>


      </Accordion.Collapse>

      
    </Card>
    </Accordion.Item>

  </Accordion>

 

))

}
  
      </MainScreen>

  );
}

export default MyNotes;