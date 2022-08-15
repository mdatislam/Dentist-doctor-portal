
import {Routes, Route,} from "react-router-dom";
import Navbar from './SharedPage/Navbar';
import Home from './Home/Home';
import About from './About/About';
import Appointment from './Appointment/Appointment';
import Login from './Protective/Login';
import Footer from './SharedPage/Footer';
import SingUp from './Protective/SingUp';
import RequireAuh from './Protective/RequireAuh';
import UpdatePassword from './Protective/UpdatePassword';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard/Dashboard";
import AppointmentList from "./Dashboard/AppointmentList";
import MyProfile from "./Dashboard/MyProfile";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-12">
     <Navbar></Navbar>
     <Routes>
      <Route path='/Home' element={<Home></Home>}></Route>
      <Route path='/About' element={<About></About>}></Route>
      <Route path='/Login' element={<Login></Login>}></Route>
      <Route path='/SignUp' element={<SingUp></SingUp>}></Route>
      <Route path='/UpdatePass' element={<UpdatePassword/>}></Route>

      <Route path="/Appointment" element={<RequireAuh>
        <Appointment/>
      </RequireAuh>}></Route>

     <Route path="Dashboard" element={<RequireAuh>
      <Dashboard/></RequireAuh>}>
        <Route index element={<MyProfile/>}/>
        <Route path="AppointmentList" element={<AppointmentList/>}/>
      </Route>
      
     </Routes>
     <Footer/>
     <ToastContainer />
    </div>
  );
}

export default App;
