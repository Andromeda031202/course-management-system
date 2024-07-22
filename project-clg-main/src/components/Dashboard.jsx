import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom';
import Course from './Course';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user.userType==="")
        navigate('/signin')
    })
  return (
    <div className='Dashboard'>
      <Course />
    </div>
  )
}

export default Dashboard