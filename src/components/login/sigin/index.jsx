import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LoginAdminPost } from '../../../redux/slice/login/post/index.js'

const Sigin = () => {

    const dispatch = useDispatch()

    const [state, setState] = useState({ username: '', password: '' })



    const Login = () => {
        dispatch(LoginAdminPost(state))
    }
    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className=' shadow-md px-[50px] w-[400px] h-[400px] bg-[rgba(#E6E9Ed)] flex flex-col items-center justify-evenly ' >
                <input onChange={(e) => setState({ ...state, username: e.target.value })} className='border-2 text-lg   w-full  h-[40px] px-4 rounded-2xl' type="text" placeholder='login' />
                <input type='text' onChange={(e) => setState({ ...state, password: e.target.value })} className='border-2 text-lg w-full h-[40px] px-4 rounded-2xl' placeholder='password' />
                <button onClick={Login} className='border-2 w-full h-[40px] rounded-2xl  bg-[white]'>Submit</button>
                <div></div>
            </div>
        </div>
    )
}

export default Sigin