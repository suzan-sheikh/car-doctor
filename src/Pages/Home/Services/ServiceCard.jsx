import { Link } from "react-router-dom";

const ServiceCard = ({service}) => {

    const {title, img, price, _id} = service;


  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={img}
            alt="service image"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body text-left">
          <h2 className="card-title text-left">{title}</h2>
          <p className="text-xl text-left">${price}</p>
          <div className="card-actions">            
            <Link to={`/checkout/${_id}`}>
              <button className="btn btn-primary">Book Now</button>
            </Link>           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
