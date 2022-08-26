import React from 'react';

const DoctorRow = ({doctor,refetch,setDoctorDel,setDoctorEdit}) => {
    const {name,image,email,serviceName}= doctor
    return (
        <tr className='border border-blue-500'>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src={image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{name}</div>
                    {/* <div class="text-sm opacity-50">United States</div> */}
                  </div>
                </div>
              </td>
              <td>{email}</td>
              <td>{serviceName}</td>
              <th>
              <button class=""
              onClick={()=>setDoctorDel(doctor)}
              >
                <label for="doctorDel" class="btn btn-circle btn-outline btn-error modal-button">  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></label>
            </button>

            <button className='px-2' 
            onClick={()=> setDoctorEdit(doctor)}>
                <label for="editDoctor" class="btn btn-circle btn-outline btn-info modal-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
</label>
            </button>
              </th>
            </tr>
            
    );
};

export default DoctorRow;