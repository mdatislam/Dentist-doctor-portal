import React from "react";
import { toast } from "react-toastify";

const ConfirmDoctorDel = ({ doctorDel, setDoctorDel, refetch }) => {
  const handleDelete = (email) => {
    //console.log(email)
    fetch(`https://floating-earth-43239.herokuapp.com/doctor/delete/${email}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((delData) => {
        if (delData.deletedCount > 0) {
          toast.success(`successfully doctor ${email} deleted`);
        }
        setDoctorDel(null);
        refetch();
        // console.log(delData)
      });
  };
  return (
    <div>
      <input type="checkbox" id="doctorDel" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            for="doctorDel"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg text-error">Warning: Confirmation!</h3>
          <p class="py-4">Are You Sure to delete it ?</p>
          <div class="modal-action">
            <button
              className="btn btn-info"
              onClick={() => handleDelete(doctorDel.email)}
            >
              {" "}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDoctorDel;
