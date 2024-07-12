import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert(res.data.Message);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <>        
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-center mb-4">
                            <h1>&nbsp;</h1>
                          {/* <h1>MESS MANAGEMENT LOGIN</h1> */}
                        </div>
                        <div className="bg-white p-3 rounded border"> 
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor='email'><strong>Username</strong></label>
                                    <input type='text' placeholder='Enter username' name='email' autoComplete='off'
                                        onChange={e => setValues({ ...values, email: e.target.value })} className='form-control rounded-3' />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <input type="password" placeholder='Enter Password' name='password'
                                        onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-3' />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block rounded-5" style={{width:'100px'}}>Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
