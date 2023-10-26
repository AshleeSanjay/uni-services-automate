import contactus from "../assets/contactus.jpg";

const Contact = () => {
  return (
    <div>
      <div className="backgnd-image">
        <h1 style={{ color: "white" }}>Contact Us</h1>
        <div>
          <p style={{ color: "white", textAlign: "justify", margin: "20px" }}>
            Need assistance or have a question? Our dedicated team at MGU is
            here to help. Feel free to reach out to us for any inquiries,
            admissions guidance, or to simply connect. Your journey with us
            starts with a conversation—let's begin shaping your academic future
            together. Visit our campus, drop us a line, or connect through
            social media. We look forward to hearing from you.
          </p>
          <div
            style={{
              borderStyle: "groove",
              borderWidth: "2px",
              margin: "20px",
              width: "25%",
            }}
          >
            <h5 style={{ color: "white", textAlign: "start", margin: "20px" }}>
              Address: XYZ Street
            </h5>
            <h5 style={{ color: "white", textAlign: "start", margin: "20px" }}>
              Phone: 123456
            </h5>
            <h5 style={{ color: "white", textAlign: "start", margin: "20px" }}>
              Email: abcd@gmail.com
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
