
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './component/Layout';
import Login from './component/Login';
import AlbumList from './component/AlbumList';
import PhotoList from './component/PhotoList';
import { ContextProvider } from './component/myContext';


function App() {
  
  return (
    <div className="App">
    <ContextProvider>
     <Routes>
      <Route path ="/" element = {<Layout/>} >
        <Route index element = {<Login/>}/>
        <Route path='/albums' element = {<AlbumList/>} />
        <Route path='/photos' element = {<PhotoList/>} />
      </Route>
     </Routes>
     </ContextProvider>
    </div>
  );
}

export default App;
