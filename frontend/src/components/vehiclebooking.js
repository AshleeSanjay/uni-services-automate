import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import addIcon from "../assets/addicon.jpg";
import deleteIcon from "../assets/deleteicon.png";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams, Link } from "react-router-dom";

const VehicleBooking = ({ route }) => {
  const [show, setShow] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const [vehicles, setVehicles] = useState(false);
  const [users, setUsers] = useState(false);
  const [usrName, setUsrName] = useState("");
  const [psw, setPsw] = useState("");
  const [usrId, setUsrId] = useState("");
  const [vehicleRegId, setVehicleRegId] = useState("");

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const onVehicleBookingSubmit = (e) => {
    e.preventDefault();
    handleHide();
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    setUsrName(searchParams.get("username"));
    setPsw(searchParams.get("password"));
    setUsrId(searchParams.get("userid"));
  }, [searchParams]);
  console.log("Username: ", usrName, "Password: ", psw, "Userid: ", usrId);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        // const prodUrl = `${
        //   process.env.REACT_APP_BASE_URL
        // }/vehiclebookingdetails?username=${searchParams.get("username")}`;
        // console.log("Prod URL: ", prodUrl);

        const res = await axios.get(
          `http://localhost:10000/vehiclebookingdetails?username=${searchParams.get(
            "username"
          )}`
        );

        setVehicleDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicleDetails();
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:10000/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicles();
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:10000/userdetails/?username=${searchParams.get(
            "username"
          )}`
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const arrVehicleDetails = Object.values(vehicleDetails);
  const arrVehicles = Object.values(vehicles);

  const VehicleBookingDetails = ({ onSubmit }) => {
    const [vehicleId, setvehicleId] = useState("");
    const [dateBooked, setDateBooked] = useState("");
    const [timeBooked, setTimeBooked] = useState("");
    const [dateRetured, setReturnDate] = useState("");

    function handleChange(event) {
      const selectedValue = event.target.value;
      // Ensure that an empty value is not selected
      if (selectedValue.trim() !== "") {
        setvehicleId(selectedValue);
      } else {
        // Optionally, you can display an alert or handle the error in another way
        alert("Please select a valid vehicle");
      }
    }
    function handleDateChange(event) {
      setDateBooked(event.target.value);
    }
    function handleTimeChange(event) {
      setTimeBooked(event.target.value);
    }
    function handleReturnDateChange(event) {
      setReturnDate(event.target.value);
    }

    const saveVehicleDetails = async (e) => {
      try {
        const today = new Date();

        if (dateBooked.trim() !== "" || dateRetured.trim() !== "") {
          if (new Date(dateBooked) < today) {
            alert("Start date should be today or a future date");
            return;
          }
          if (new Date(dateBooked) > new Date(dateRetured)) {
            alert("End date should be equal or greater than the start date");
            return;
          }
        } else {
          // Empty date string
          alert("Please enter a date");
          return;
        }
        // Add a validation check for start date not earlier than today's date

        await axios.post("http://localhost:10000/vehiclebookingdetails", {
          vregid: vehicleId,
          userfid: searchParams.get("userid"),
          bookeddate: dateBooked,
          bookedtime: timeBooked,
          returndate: dateRetured,
          bookedStatusFlag: 1,
        });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formVehicleName">
          <Form.Label>Vehicle Name</Form.Label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="ddlVehicle">
                Select Vehicle
              </label>
            </div>
            <select
              class="custom-select"
              id="ddlVehicle"
              style={{
                width: "343px",
                borderColor: "lightgray",
                borderRadius: "5px",
              }}
              onChange={handleChange}
              value={vehicleId}
            >
              <option value="">Select</option>
              {arrVehicles.map((vehicle) => (
                <option value={vehicle.vid}>{vehicle.vehiclename}</option>
              ))}
            </select>
          </div>
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date"
            value={dateBooked}
            onChange={handleDateChange}
          />
        </Form.Group>
        <Form.Group controlId="formTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Time"
            value={timeBooked}
            onChange={handleTimeChange}
          />
        </Form.Group>
        <Form.Group controlId="formReturnDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Return Date"
            value={dateRetured}
            onChange={handleReturnDateChange}
          />
        </Form.Group>
        <div style={{ height: "8px" }}></div>
        <Button
          style={{ backgroundColor: "#ef762b" }}
          type="submit"
          block
          onClick={saveVehicleDetails}
        >
          Submit
        </Button>
      </Form>
    );
  };
  const handleDelete = (id) => {
    console.log("Vehicle Registration Id: ", id);
    try {
      axios.put(`http://localhost:10000/updatevehiclebookingdetails?id=${id}`);
      alert(`Booking of vehicle with registered id : ${id} is canceled`);
      window.location.reload(false);
    } catch (err) {}
  };
  return (
    <div>
      <div>
        <h1>Book a Vehicle</h1>
      </div>
      <div>
        <div className="div-booking">
          <div>
            <button type="submit" className="img-btn" onClick={handleShow}>
              <img
                src={addIcon}
                alt="addIcon"
                style={{ width: "30px", height: "30px" }}
              ></img>
            </button>
          </div>
          <div className="div-text">Book a Vehicle</div>
          <div className="mt-3" style={{ marginLeft: "1000px" }}>
            <Link
              to={`/services?username=${usrName}&password=${psw}&userid=${usrId}`}
            >
              Back to Services
            </Link>
          </div>
        </div>

        <Modal show={show} onHide={handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>Login Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VehicleBookingDetails onSubmit={onVehicleBookingSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>
              Close Modal
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              {/* <th>Vehicle Regitration Number</th> */}
              <th>Vehicle Name</th>
              <th>Staff Name</th>
              <th>Booked Date</th>
              <th>Booked Time</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {arrVehicleDetails.map((vehicleDetail) => (
              <tr>
                {/* <td>{vehicleDetail.regid}</td> */}
                <td>{vehicleDetail.vehicleName}</td>
                <td>{vehicleDetail.userName}</td>
                <td>
                  {format(new Date(vehicleDetail.bookedDate), "MMMM do yyyy")}
                </td>
                <td>{vehicleDetail.bookedTime}</td>
                <td>
                  {format(new Date(vehicleDetail.returnDate), "MMMM do yyyy")}
                </td>
                <td>
                  <button
                    type="submit"
                    className="img-btn"
                    onClick={() => handleDelete(vehicleDetail.id)}
                    value={vehicleDetail.id}
                  >
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      style={{ width: "30px", height: "30px" }}
                    ></img>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default VehicleBooking;
