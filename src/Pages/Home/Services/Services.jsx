import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://cr-doctor-server.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      <div className="mt-4">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-orange-500">Our Services</h3>
          <h2 className="text-5xl">Our Services Area</h2>
          <p>
            the majority have suffered alteration in some form, by injected
            humour, or randomised <br /> words which don't look even slightly
            believable.{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
            services.map(service => <ServiceCard
            key={service.id} service={service}
            ></ServiceCard>)
            }
        </div>
      </div>
    </div>
  );
};

export default Services;
