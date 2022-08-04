import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Login = () => {
  const [formData, setFormData] = useState ({
    email: '',
    password: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = e => {
    setFormData(prev => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    if (password !== password2) {
      toast.error('passwords do not match')
    }
  }

  return (
    <>
      <section className='heading'>
        <h1><FaSignInAlt /> Login</h1>
        <p>Please login for support</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input className='form-control' type='email' id='email' name='email' value={email} onChange={onChange} placeholder='email' required />
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' id='password' name='password' value={password} onChange={onChange} placeholder='password' required />
          </div>
          <button className='btn btn-block'>Submit</button>
        </form>
      </section>
    </>
  )
}

export default Login