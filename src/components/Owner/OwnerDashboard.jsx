import React, { use } from 'react'
import { useSelector } from 'react-redux';
import Stores from '../Common/Stores';

const OwnerDashboard = () => {
    const user=useSelector((state)=>state.auth.user);
   
    
  return (
    <div>
        <Stores owner_id={user.id} />
    </div>
  )
}

export default OwnerDashboard