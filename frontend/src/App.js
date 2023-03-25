import './App.css';
import Login from './components/login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './components/homePage';
import Register from './components/register';
import NoteForm from './components/noteForm';
import NoteDetail from './components/noteDetails';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/noteForm' element={<NoteForm/>}/>
          <Route path='/noteForm/:id' element={<NoteDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
