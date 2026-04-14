import '../style/Navbar.css'
import { useNavigate } from 'react-router-dom';


function Navbar(){

  const navigator=useNavigate();
    return(<>
       <div id='ww'>    
         <button onClick={() => navigator("/")}>login</button>
         <button onClick={() => navigator("/Signup")}>Signup</button>
       </div>
    </>)
}
export default Navbar;