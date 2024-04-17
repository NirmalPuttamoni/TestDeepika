import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import MainScreen from "../../components/MainScreen";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote() {
  const navigate=useNavigate()
  const { id } = useParams();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
    updatedAt: "",
  });

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading: loadingUpdate, error: errorUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/notes/${id}`);
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchData();
  }, [id]);

  const resetHandler = () => {
    setNote({
      title: "",
      content: "",
      category: "",
      updatedAt: "",
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, note.title, note.content, note.category));
    if (!note.title || !note.content || !note.category) return;

    resetHandler();
    navigate("/mynotes");
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(id));

    }
    navigate("/mynotes");


  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
          {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
            {errorUpdate && <ErrorMessage variant="danger">{errorUpdate}</ErrorMessage>}
            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </Form.Group>
            {note.content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Category"
                value={note.category}
                onChange={(e) => setNote({ ...note, category: e.target.value })}
              />
            </Form.Group>
            {loadingUpdate && <Loading size={50} />}
            <Button variant="primary" type="submit" className="mx-2">
              Update Note
            </Button>
            <Button variant="danger" 
            onClick={() => deleteHandler(note._id)}
>
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : ""}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
