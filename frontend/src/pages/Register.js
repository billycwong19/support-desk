import { useState } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState ({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = e => {
    setFormData(prev => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <section className='heading'>
        <h1><FaUser /> Register</h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form>
          <div className='form-group'>
            <input className='form-control' type='text' id='name' name='name' value={name} onChange={onChange} placeholder='name' />  
          </div>
          <div className='form-group'>
            <input className='form-control' type='email' id='email' name='email' value={email} onChange={onChange} placeholder='email' />
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' id='password' name='password' value={password} onChange={onChange} placeholder='password' />
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' id='password2' name='password2' value={password2} onChange={onChange} placeholder='confirm password' />
          </div>
          <button className='btn btn-block'>Submit</button>
        </form>
      </section>
    </>
  )
}

export default Register