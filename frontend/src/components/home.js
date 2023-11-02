import React from "react";
import students from "../assets/students.jpg";
import students2 from "../assets/students2.webp";
import "../styles/home.css"; // Import your custom CSS for styling

const Home = () => {
  // Disable scrollbars when the component mounts
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrollbars when the component unmounts
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="home-container">
      <div>
        <h1 className="home-heading">Home</h1>
      </div>
      <div className="home-section">
        <div className="home-image">
          <img src={students} alt="students" className="img-students" />
        </div>
        <div className="home-text">
          <p>
            Welcome to Mahatma Gandhi University, where we foster a culture of
            curiosity, innovation, and academic excellence. Our commitment is to
            empower students like you to embark on a journey of self-discovery
            and success.
          </p>
        </div>
        <div className="home-image">
          <img src={students2} alt="students2" className="img-students" />
        </div>
      </div>
    </div>
  );
};

export default Home;
