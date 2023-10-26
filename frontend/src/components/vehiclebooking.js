import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import addIcon from "../assets/addicon.jpg";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

const VehicleBooking = ({ route }) => {
  const [show, setShow] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(false);
  const [vehicles, setVehicles] = useState(false);
  const [users, setUsers] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const onVehicleBookingSubmit = (e) => {
    e.preventDefault();
    handleHide();
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/vehiclebookingdetails?username=${searchParams.get(
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
        const res = await axios.get("http://localhost:8000/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicles();
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/userdetails/?username=${searchParams.get(
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
      setvehicleId(event.target.value);
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
        await axios.post("http://localhost:8000/vehiclebookingdetails", {
          vregid: vehicleId,
          userfid: searchParams.get("userid"),
          bookeddate: dateBooked,
          bookedtime: timeBooked,
          returndate: dateRetured,
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
              {arrVehicles.map((vehicle) => (
                <option value={vehicle.vid}>{vehicle.vehiclename}</option>
              ))}
            </select>
            <p>{vehicleId}</p>
          </div>
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
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
          <Form.Label>Date</Form.Label>
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
                <td>{vehicleDetail.vehicleName}</td>
                <td>{vehicleDetail.userName}</td>
                <td>
                  {format(new Date(vehicleDetail.bookedDate), "MMMM do yyyy")}
                </td>
                <td>{vehicleDetail.bookedTime}</td>
                <td>
                  {format(new Date(vehicleDetail.returnDate), "MMMM do yyyy")}
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
