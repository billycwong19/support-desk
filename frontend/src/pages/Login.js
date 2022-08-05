import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState ({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // redirect when logged in
    if (isSuccess || user) {
        navigate('/')
    }

    dispatch(reset())

  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = e => {
    setFormData(prev => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      email, 
      password, 
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
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