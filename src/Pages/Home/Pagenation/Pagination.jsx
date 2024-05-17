import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Pagination = () => {

  const [services, setServices] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0)


  useEffect(() => {
    fetch(`http://localhost:5000/product?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [currentPage, itemsPerPage]);

  const {count} = useLoaderData();
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];


  const handleItems = e => {
    const val = parseInt(e.target.value)
    setItemsPerPage(val)
    setCurrentPage(0)
    console.log(val);
  }

  const handlePrevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if(currentPage < pages.length -1){
      setCurrentPage(currentPage + 1)
    }
  }




  return (
    <div>
      <div className="mt-4">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-orange-500">Our Services : {services.length}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
            services.map(service => 

              <div key={service._id} className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={service.img}
                  alt="service image"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body text-left">
                <h2 className="card-title text-left">{service.title}</h2>
                <p className="text-xl text-left">${service.price? service.price : 20}</p>
                <div className="card-actions">    
                    <button className="btn btn-primary">Book Now</button>         
                </div>
              </div>
            </div>
            )
            }
        </div>
         <p className="text-center">CurrentPage {currentPage}</p>
        <div className="flex gap-2 justify-center m-4">
         
          <button onClick={handlePrevPage} className="btn">Previous</button>
          {
            pages.map(page => <button onClick={() => setCurrentPage(page)} className={`btn ${currentPage === page ? 'bg-orange-600' : ''}`} key={page}>{page}</button>)
          }
          <button onClick={handleNextPage} className="btn">Next</button>
          <select value={itemsPerPage} onChange={handleItems} name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
