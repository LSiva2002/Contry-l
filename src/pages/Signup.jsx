import React, { useState } from 'react'
import "../style/Signup.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Signup() {
  const navigator = useNavigate();

  const [id, setId] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");


  const handlesubmit = (e) => {
    if (IsValidate()) {
      e.preventDefault();

      let reg_obj = {
        id,
        fullname,
        password,
        email,
        gender
      };




      fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(reg_obj)
      }).then((res) => {
        toast.success('Registered Successfully ');
        navigator('/');
      }).catch((err) => {
        toast.error('Failed :' + err.message);
      });
    }
  };

  const IsValidate = () => {
    let isProceed = true;

    if (id == null || id == '') {
      isProceed = false;
      errormessage += "username";
    }
    if (fullname == null || fullname == '') {
      isProceed = false;
      errormessage += "fullname";
    }
    if (password == null || password == '') {
      isProceed = false;
      errormessage += "password";
    }
    if (email == null || email == '') {
      isProceed = false;
      errormessage += "email";
    }
    if (!isProceed) {
      toast.warning(errormessage);
    }

    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

    } else {
      isProceed = false;
      toast.warning('Please Enter The Valid Email')
    }
    return isProceed;
  }



  return (
    <>
      <div className='ff'>
        <form onSubmit={handlesubmit}>
          <div>
            <h1>User Registeration</h1>
          </div>
          <div>
            <label htmlFor='username' >User Name <span>*</span></label>
            <input id='username' value={id} onChange={e => setId(e.target.value)} type="text" />
          </div>
          <div>
            <label htmlFor='fullname' >Full Name <span>*</span></label>
            <input id='fullname' value={fullname} onChange={e => setFullname(e.target.value)} type="text" />
          </div>
          <div>
            <label htmlFor='password'>Create Password <span>*</span></label>
            <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor='email'>Email <span>*</span></label>
            <input id='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>

            <label>Gender <span>*</span></label>

            <div className="gender-container">
              <label className="gender-item">
                <input
                  type="radio"
                  name="Gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={e => setGender(e.target.value)}
                />
                Male
              </label>

              <label className="gender-item">
                <input
                  type="radio"
                  name="Gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={e => setGender(e.target.value)}
                />
                Female
              </label>
            </div>

          </div>
          <div>
            <button className='signup-b' type="submit">Register</button>
          </div>

        </form>
      </div>

    </>
  )
}

export default Signup