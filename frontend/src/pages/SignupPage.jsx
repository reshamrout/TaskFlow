import React, {useState} from 'react'


const SignupPage = () => {

    const [formData, setFormData] = useState({
      firstName : "",
      lastName : "",
      email : "",
      password : "",
      cnfPassword : "",
      accountType : "",
    });

    const {firstName, lastName, email, password, cnfPassword, accountType} = formData;

    const handleChange = (e) =>{
      setFormData((prevData)=>({
        ...prevData,
        [e.target.name] : e.target.value
      }))
    }

  return (
    <div>
      <form>
        <label>
          <p>First Name</p>
            <input
              type='text'
              name='firstName'
              value = {firstName}
              onChange={handleChange}
              placeholder='Enter First Name'
            >
            </input>
        </label>

        <label>
          <p>Last Name</p>
            <input
              type='text'
              name='lastName'
              value = {lastName}
              onChange={handleChange}
              placeholder='Enter Last Name'
            >
            </input>
        </label>

        <label>
          <p>Email</p>
            <input
              type='text'
              name='email'
              value = {email}
              onChange={handleChange}
              placeholder='Enter Email'
            >
            </input>
        </label>

        <label>
          <p>Password</p>
            <input
              type='password'
              name='password'
              value = {password}
              onChange={handleChange}
              placeholder='Enter Password'
            >
            </input>
        </label>

        <label>
          <p>Confirm Password</p>
            <input
              type='text'
              name='cnfPassword'
              value = {cnfPassword}
              onChange={handleChange}
              placeholder='Enter Confirm Password'
            >
            </input>
        </label>
        <div>
          <p>Account Type:</p>
          <label>User
            <input
              type='radio'
              name='accountType'
              value="User"
              checked={accountType === "User"}
              onChange={handleChange}
            >
            </input>
          </label>

           <label>Admin
            <input
              type='radio'
              name='accountType'
              value="Admin"
              checked={accountType === "Admin"}
              onChange={handleChange}
            >
            </input>
          </label>
        </div>
      </form>
    </div>
  )
}

export default SignupPage