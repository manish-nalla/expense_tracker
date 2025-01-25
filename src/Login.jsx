import { useState } from 'react';
import './Login.css';

const Login = ({onLogin}) => {
    const [username,setUsername] = useState("");

    const handleLogin = () => {
        if(!username.trim()){
            alert("Please enter a valid username!");
            return
        }
        onLogin(username.trim())
    }
    return (
        <div className='container'>
            <h1 className='heading'>Login to your Expense Tracker</h1>
            <input className='input'
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <button className='btn-login' onClick={handleLogin}>Login</button> 
        </div>
    )
}


export default Login;