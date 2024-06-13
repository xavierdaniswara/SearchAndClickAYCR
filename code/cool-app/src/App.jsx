import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Login"; //belum ada
import Register from "./RegisAcc"
function App() {

  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/kjgfdlkj" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
