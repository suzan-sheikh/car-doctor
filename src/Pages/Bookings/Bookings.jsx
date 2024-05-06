import { useEffect, useState } from "react";
import UseAuth from "../../Hook/UseAuth";
import BookingsRow from "./BookingsRow";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Bookings = () => {

    const {user} = UseAuth();
    const [bookings, setBooking] = useState([]);
    const [control, setControl] = useState([false]);

    const axiosSecure = useAxiosSecure();


    // const url = `http://localhost:5000/bookings?email=${user?.email}`;
    const url = `/bookings?email=${user?.email}`;

    useEffect(() => {

      axiosSecure.get(url)
      .then(res => {
        setBooking(res.data)
      })
    },[control])

    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
    
                  setControl(!control);
                }
              });
          }
        });
      };

      
      const handleConfirm = id => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })

      }





    return (
        <div>
            <h3 className="text-5xl">Your Bookings is: {bookings.length}</h3>     
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Service</th>
                        <th>date</th>
                        <th>Price</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => <BookingsRow key={booking._id} booking={booking} handleConfirm={handleConfirm} handleDelete={handleDelete}></BookingsRow>)}
                    </tbody>                    
                </table>
            </div>
        </div>
    );
};

export default Bookings;