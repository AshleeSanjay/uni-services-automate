import students3 from "../assets/students3.webp";
const About = () => {
  return (
    <div>
      <div>
        <h1>About Us</h1>
      </div>
      <div className="d-flex flex-column justify-content-evenly">
        <p style={{ textAlign: "justify", height: "137px", marginTop: "50px" }}>
          At Mahatma Gandhi University, our 'About Us' is more than a story—it's
          a narrative of academic prowess, a commitment to innovation, and a
          testament to the transformative impact of education. Join us in our
          pursuit of knowledge, where every chapter is marked by a passion for
          learning and a dedication to shaping the leaders of tomorrow.
        </p>
        <img src={students3} alt="students3" style={{ height: "500px" }} />
      </div>
    </div>
  );
};

export default About;
