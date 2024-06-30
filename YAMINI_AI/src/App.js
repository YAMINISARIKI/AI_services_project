import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Newaccount from './components/newaccount';
import Forgotpass from './components/forgotpass';
import Txt2img from './components/txt2img';
import Txt2vid from './components/txt2vid';
import Txt2aud from './components/txt2aud';
import Img2text from './components/img2text';
import Imgedit from './components/imgedit';
import Aud2txt from './components/aud2txt';
import Prmt2aud from './components/prmt2aud';
import Logout from './components/logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/newaccount' element={<Newaccount/>}/>
          <Route path='/forgotpassword' element={<Forgotpass/>}/>
          <Route path='/txt2img' element={<Txt2img/>}/>
          <Route path='/txt2vid' element={<Txt2vid/>}/>
          <Route path='/txt2aud' element={<Txt2aud/>}/>
          <Route path='/img2text' element={<Img2text/>}/>
          <Route path='/imgedit' element={<Imgedit/>}/>
          <Route path='/aud2txt' element={<Aud2txt/>}/>
          <Route path='/prmt2aud' element={<Prmt2aud/>}/>
          <Route path='/logout' element={<Logout/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
