import { useLoaderData } from "react-router-dom";
import UseAuth from "../../Hook/UseAuth";
import Swal from 'sweetalert2'

const CheckOut = () => {
  const service = useLoaderData();
  const { title, _id, price, img } = service;

  const  {user} = UseAuth();


  const handleBookService = e  => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const order = {
        customerName : name,
        email,
        date,
        img,
        service: title,
        service_id: _id,
        price: price,

    }
    console.log(order);
    fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
            'content-type': 'application/json' 
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        if (data.insertedId) {
            Swal.fire({
              title: "success!",
              text: "Added Tourists Spot Successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
    })
  }





  return (
    <div>
      <h2 className="text-center text-2xl">Book Services: {title}</h2>

      <form onSubmit={handleBookService}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
              type="text"
              name="amount"
              defaultValue={"$ " + price}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
