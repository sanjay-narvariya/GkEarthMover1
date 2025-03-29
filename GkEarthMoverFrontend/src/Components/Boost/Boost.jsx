import React from 'react'
import './Boost.css';
import Gaurav from "../../Assets/Gaurav.png";

const Boost = () => {

  const testimonials = [
    {
      text: "Working with GK EARTH MOVERS has transformed our project timelines. Their reliable equipment and exceptional support have been game-changers for our team, enabling us to stay on schedule and within budget. From smooth rentals to top-notch on-site assistance, Built truly delivers on their promise of productivity and reliability.",
      name: "Gaurav Dada",
      title: "Desi Balak",
      image: Gaurav, // Replace with the correct image import for Gaurav
    },
    {
      text: "Built has been an invaluable partner in helping us meet our project goals. Their high-quality equipment and dependable service have made all the difference in keeping our work efficient and productive. Every interaction with their team has been professional and supportive. Knowing we have the right tools and a team we can rely on.",
      name: "Rohan Sharma",
      title: "Engineer",
      image: Gaurav, // Replace with the correct image import for Rohan
    },
    {
      text: "Choosing GK EARTH MOVERS for our equipment rentals has been one of the best decisions for our projects. Their commitment to quality and reliability means we always have access to well-maintained. Built’s team goes above and beyond with their customer service, making the entire rental process easy and hassle-free. ",
      name: "Pooja Patel",
      title: "Project Manager",
      image: Gaurav, // Replace with the correct image import for Pooja
    },
  ];
  

  return (
    <>
     <div className="container-fluid boostbg">
     <div className="container">
        <div className="row">
        <div className="testimonial-full-data">
        <div className="boost-heading">
            <div className="boost-title">
                <h4>STORY OF CLIENT</h4>
            </div>
            <div className="boost-subtitle">
                <h1>Boost <span>Productivity</span> with
                Built's Reliable Solutions</h1>
            </div>
            </div>
              
           <div className="row">
  {testimonials.map((testimonial, index) => (
    <div className="col-md-4 mb-4" key={index}>
      <div className="testimonial-bg">
        <div className="testimonial-data">
          <p>{testimonial.text}</p>
        </div>
        <div className="testimonial-profile">
          <div className="testimonial-img">
            <img src={testimonial.image} alt={`Profile of ${testimonial.name}`} />
          </div>
          <div className="testimonial-name">
            <h4>{testimonial.name}</h4>
            <h5>{testimonial.title}</h5>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            </div>
        </div>
        </div>
     </div>

    </>
  )
}

export default Boost