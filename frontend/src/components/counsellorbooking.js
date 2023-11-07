import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import addIcon from "../assets/addicon.jpg";
import deleteIcon from "../assets/deleteicon.png";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams, Link } from "react-router-dom";

const CounsellorBooking = ({ route }) => {
  const [show, setShow] = useState(false);
  const [counsellorDetails, setCounsellorDetails] = useState(false);
  const [counsellors, setCounsellors] = useState(false);
  const [users, setUsers] = useState(false);
  const [usrName, setUsrName] = useState("");
  const [psw, setPsw] = useState("");
  const [usrId, setUsrId] = useState("");

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const onCounsellorBookingSubmit = (e) => {
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
    const fetchCounsellorDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:10000/counsellorbookingdetails?username=${searchParams.get(
            "username"
          )}`
        );
        setCounsellorDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounsellorDetails();
    const fetchCounsellors = async () => {
      try {
        const res = await axios.get("http://localhost:10000/counsellors");
        setCounsellors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounsellors();
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

  const arrCounsellorDetails = Object.values(counsellorDetails);
  const arrCounsellors = Object.values(counsellors);
  console.log(arrCounsellorDetails);

  const CounsellorBookingDetails = ({ onSubmit }) => {
    const [counsellorId, setCounsellorId] = useState("");
    const [dateBooked, setDateBooked] = useState("");
    const [timeBooked, setTimeBooked] = useState("");
    const [endDate, setEndDate] = useState("");

    function handleChange(event) {
      const selectedValue = event.target.value;

      // Ensure that an empty value is not selected
      if (selectedValue.trim() !== "") {
        setCounsellorId(selectedValue);
      } else {
        // Optionally, you can display an alert or handle the error in another way
        alert("Please select a valid counsellor");
      }
    }
    function handleDateChange(event) {
      setDateBooked(event.target.value);
    }
    function handleTimeChange(event) {
      setTimeBooked(event.target.value);
    }
    function handleEndDateChange(event) {
      setEndDate(event.target.value);
    }

    const saveCounsellorDetails = async (e) => {
      try {
        const today = new Date();
        if (dateBooked.trim() !== "" || endDate.trim() !== "") {
          if (new Date(dateBooked) < today) {
            alert("Start date should be today or a future date");
            return;
          }
          if (new Date(dateBooked) > new Date(endDate)) {
            alert("End date should be equal or greater than the start date");
            return;
          }
        } else {
          alert("Please select date");
          return;
        }
        // Add a validation check for start date not earlier than today's date

        await axios.post("http://localhost:10000/counsellorbookingdetails", {
          counsellorid: counsellorId,
          userid: searchParams.get("userid"),
          bookingfromdate: dateBooked,
          bookingfromtime: timeBooked,
          bookedtodate: endDate,
          bookedStatusFlag: 1,
        });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formCounsellorName">
          <Form.Label>Counsellor Name</Form.Label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="ddlCounsellor">
                Select Counsellor
              </label>
            </div>
            <select
              class="custom-select"
              id="ddlCounsellor"
              style={{
                width: "315px",
                borderColor: "lightgray",
                borderRadius: "5px",
              }}
              onChange={handleChange}
              value={counsellorId}
            >
              <option value="">Select</option>
              {arrCounsellors.map((counsellor) => (
                <option value={counsellor.counsellorid}>
                  {counsellor.counsellorname}
                </option>
              ))}
            </select>
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
        <Form.Group controlId="formEndDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </Form.Group>
        <div style={{ height: "8px" }}></div>
        <Button
          style={{ backgroundColor: "#ef762b" }}
          type="submit"
          block
          onClick={saveCounsellorDetails}
        >
          Submit
        </Button>
      </Form>
    );
  };
  const handleDelete = (id) => {
    console.log("Counsellor Id: ", id);
    try {
      axios.put(
        `http://localhost:10000/updatecounsellorbookingdetails?id=${id}`
      );
      window.location.reload(false);
    } catch (err) {}
  };

  return (
    <div>
      <div>
        <h1>Book a Counsellor</h1>
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
          <div className="div-text">Book a Counsellor</div>
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
            <CounsellorBookingDetails onSubmit={onCounsellorBookingSubmit} />
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
              <th>Counsellor Name</th>
              <th>User Name</th>
              <th>Booked Date</th>
              <th>Booked Time</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {arrCounsellorDetails.map((counsellorDetails) => (
              <tr>
                <td>{counsellorDetails.counsellorname}</td>
                <td>{counsellorDetails.username}</td>
                <td>
                  {format(
                    new Date(counsellorDetails.bookingfromdate),
                    "MMMM do yyyy"
                  )}
                </td>
                <td>{counsellorDetails.bookingfromtime}</td>
                <td>
                  {format(
                    new Date(counsellorDetails.bookedtodate),
                    "MMMM do yyyy"
                  )}
                </td>
                <td>
                  <button
                    type="submit"
                    className="img-btn"
                    onClick={() => handleDelete(counsellorDetails.id)}
                    value={counsellorDetails.id}
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
export default CounsellorBooking;
