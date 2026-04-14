
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'

function Login() {

  const [username, usernameupdate] = useState('');
  const [password, passwordupdate] = useState('');

  const navigator = useNavigate();

  const proceedlogin = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3000/user/" + username);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const res = await response.json();

      if (res.password === password) {
        toast.success("Login successful");
        navigator("/Home");
      } else {
        toast.error("Wrong password");
      }
    } catch (error) {
      toast.warning("Please Sign Up");
    }
  };
  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning("please enter the username");
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning("please enter the password");
    }
    return result;
  }
  return (
    <>
      <div className="lo">
        <form onSubmit={proceedlogin}>
          <div>
            <h2>User Login</h2>
          </div>
          <div>
            <label >User Name <span>*</span></label>
            <input type="text" value={username} onChange={(e) => usernameupdate(e.target.value)} />
          </div>
          <div>
            <label >Password<span>*</span></label>
            <input type="password" value={password} onChange={(e) => passwordupdate(e.target.value)} />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => navigator("/Signup")}>Signup</button>
          </div>
        </form>
      </div>

    </>
  )
} export default Login;