import students from "../assets/students.jpg";
import students2 from "../assets/students2.webp";
const Home = () => {
  return (
    <div style={{ backgroundColor: "#524640" }}>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="align-self-stretch">
          <img src={students} alt="students" className="img-students"></img>
        </div>
        <div
          style={{
            marginTop: "160px",
            width: "800px",
            marginLeft: "30px",
            marginRight: "30px",
            textAlign: "justify",
          }}
        >
          <p style={{ color: "white" }}>
            Embark on a journey of discovery and excellence at Mahatma Gandhi
            University, where education transcends boundaries and empowers you
            to redefine the future.
          </p>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <div
          style={{
            marginTop: "160px",
            width: "800px",
            marginLeft: "30px",
            marginRight: "30px",
            textAlign: "justify",
          }}
        >
          <p style={{ color: "white" }}>
            At Mahatma Gandhi University, we believe in the extraordinary
            potential within every student, inspiring them to thrive
            academically and shape a world of limitless possibilities.
          </p>
        </div>

        <div className="align-self-left">
          <img src={students2} alt="students2" className="img-students"></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
