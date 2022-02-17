import logo from './logo.svg';
import * as ui from '@material-ui/core';
import './App.css';
import Paperbase from './paperbase';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

let user_data = {}

export default function App() {
  return (
    <Router basename={window.location.pathname || ''}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/users/:user/repos" element={<About />}/>
          <Route path="/users/:user/repos/:repo" element={<Dashboard/>}/>
        </Routes>
    </Router>
  );
}

// You can think of these components as "pages" in your app.

async function getGithub(user){
  try
  {
    const U_data = await axios.get(`https://api.github.com/users/${user}`)
    const R_data = await axios.get(`https://api.github.com/users/${user}/repos`, { params: { per_page: 10}})
    return user_data = {U_data, R_data}
  } 
  catch (error) 
  {
    console.log("Axios Error!!", error);    
  }
}

function Home() {
let user, navigate = useNavigate()
 return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ui.TextField label="Input Github URL" color="secondary" focused required onChange={(event) => user = event.target.value.split('/').pop()}/>
        <br/>
        <ui.Button variant="text" onClick={async () => {
          await getGithub(user)
          navigate(`/users/${user}/repos`)
        }}>Go</ui.Button>
      </header>
    </div>
  );
}

function About() {
  return (
    <div>
      <Paperbase userInfo={user_data}></Paperbase>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <Paperbase userInfo={user_data}></Paperbase>
    </div>
  );
}


