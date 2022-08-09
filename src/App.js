
import {Routes, Route,} from "react-router-dom";
import Navbar from './SharedPage/Navbar';
import Home from './Home/Home';
import About from './About/About';
import Appointment from './Appointment/Appointment';
import Login from './Protective/Login';
import Footer from './SharedPage/Footer';
import SingUp from './Protective/SingUp';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-12">
     <Navbar></Navbar>
     <Routes>
      <Route path='/Home' element={<Home></Home>}></Route>
      <Route path='/About' element={<About></About>}></Route>
      <Route path='/Appointment' element={<Appointment></Appointment>}></Route>
      <Route path='/Login' element={<Login></Login>}></Route>
      <Route path='/SignUp' element={<SingUp></SingUp>}></Route>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
