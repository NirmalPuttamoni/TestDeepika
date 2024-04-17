import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import LandingPage from './screens/LandingPage/LandingPage';
import {BrowserRouter, Route} from "react-router-dom"
import MyNotes from './screens/MyNotes/MyNotes';
import { Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");

return (
  <BrowserRouter >
<Header setSearch={setSearch} />
  <main >
    <Routes>
    <Route path='/' element={<LandingPage/>} exact></Route>
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/profile" element={<ProfileScreen />} />

    <Route path='/register' element={<RegisterScreen/>} ></Route>
    <Route path="/createnote" element={<CreateNote/>}></Route>

    <Route path="/note/:id" element={<SingleNote/>}></Route>

  <Route path="/mynotes" element={<MyNotes search={search}/>}></Route>
    </Routes>



  </main>
  <Footer/>
  </BrowserRouter>
);
}
 


export default App;
