import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../SharedPage/Loading';
import { toast } from 'react-toastify';

const Users = () => {

    const {data:users,isLoading,refetch}= useQuery(['user'],()=>
    fetch('http://localhost:5000/users',{
        method:'GET',
        headers:{
            authorization:`Bearer ${localStorage.getItem('accessToken')}`
        },
    }).then(res=>res.json())
    )

    if(isLoading){
        return <Loading/>
    }

    const makeAdmin = (email) =>{
        const url = `http://localhost:5000/user/admin/${email}`
        //console.log(url)
    fetch(url,{
            method:'PUT',
            headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then(res=>{
            if(res.status === 403){
                toast.error("You are not admin")
            }
           return res.json()
        })
        .then(data=>{
            refetch()
            if(data.modifiedCount>0){
                toast.success("update successfully")
            }
        })
        //console.log(email)
    }
    return (
        <div>
        <div class="overflow-x-auto">
<table class="table table-compact w-full">
<thead>
  <tr>
    <th>S/N</th> 
    <th>Email</th> 
    <th>Role</th>
    <th>Action</th>
  </tr>
</thead> 
<tbody>
    {
        users.map((s,index) =>
    
  <tr class="hover border-2">
    <th>{index+1}</th> 
    <td>{s.email}</td> 
    <td>
    {s.role !== 'admin' ? <button 
onClick={()=>makeAdmin(s.email)}
    class="btn btn-xs">Make Admin</button>
    :<button class="btn btn-primary btn-xs">Already Admin</button>
}
    </td> 

    
  </tr>
        )}
  
</tbody> 

</table>
</div>
    </div>
    );
};

export default Users;