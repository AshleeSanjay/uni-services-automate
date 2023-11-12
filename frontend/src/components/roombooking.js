import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import addIcon from "../assets/addicon.jpg";
import deleteIcon from "../assets/deleteicon.png";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams, Link } from "react-router-dom";

const RoomBooking = ({ route }) => {
  const [show, setShow] = useState(false);
  const [roomDetails, setRoomDetails] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [users, setUsers] = useState(false);
  const [usrName, setUsrName] = useState("");
  const [psw, setPsw] = useState("");
  const [usrId, setUsrId] = useState("");

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const onRoomBookingSubmit = (e) => {
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
    const fetchRoomDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:10000/roombookingdetails?username=${searchParams.get(
            "username"
          )}`
        );
        setRoomDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoomDetails();
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:10000/rooms");
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.URL}/userdetails/?username=${searchParams.get(
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

  const arrRoomDetails = Object.values(roomDetails);
  const arrRooms = Object.values(rooms);

  const RoomBookingDetails = ({ onSubmit }) => {
    const [roomId, setRoomId] = useState("");
    const [dateBooked, setDateBooked] = useState("");
    const [timeBooked, setTimeBooked] = useState("");
    const [toDate, setToDate] = useState("");
    const [toTime, setToTime] = useState("");

    function handleChange(event) {
      const selectedValue = event.target.value;
      // Ensure that an empty value is not selected
      if (selectedValue.trim() !== "") {
        setRoomId(selectedValue);
      } else {
        // Optionally, you can display an alert or handle the error in another way
        alert("Please select a valid room");
      }
    }
    function handleDateChange(event) {
      setDateBooked(event.target.value);
    }
    function handleFromTimeChange(event) {
      setTimeBooked(event.target.value);
    }
    function handleToDateChange(event) {
      setToDate(event.target.value);
    }
    function handleToTimeChange(event) {
      setToTime(event.target.value);
    }

    const saveRoomDetails = async (e) => {
      try {
        const today = new Date();
        const currentTime = new Date();
        if (dateBooked.trim() !== "" || toDate.trim() !== "") {
          if (timeBooked.trim() !== "" || toTime.trim() !== "") {
            if (new Date(dateBooked) < today) {
              alert("Start date should be today or a future date");
              return;
            }

            // Validation check for start date not greater than end date
            if (new Date(dateBooked) > new Date(toDate)) {
              alert("End date should be equal or greater than the start date");
              return;
            }

            // Validation check for start time not greater than end time
            if (
              new Date(`${dateBooked} ${timeBooked}`) >=
              new Date(`${toDate} ${toTime}`)
            ) {
              alert("End time should be greater than the start time");
              return;
            }

            // Validation check for start time not earlier than the current time
            if (
              new Date(`${dateBooked} ${timeBooked}`) <=
              new Date(
                `${today.toISOString().split("T")[0]} ${
                  currentTime.toISOString().split("T")[1].split(".")[0]
                }`
              )
            ) {
              alert("Start time should be greater than the current time");
              return;
            }

            // Validation check for valid date and time formats
            if (
              !/^\d{4}-\d{2}-\d{2}$/.test(dateBooked) ||
              !/^\d{2}:\d{2}$/.test(timeBooked) ||
              !/^\d{4}-\d{2}-\d{2}$/.test(toDate) ||
              !/^\d{2}:\d{2}$/.test(toTime)
            ) {
              alert("Invalid date or time format");
              return;
            }
          } else {
            alert("Please enter time");
            return;
          }
        } else {
          alert("Please enter date");
          return;
        }
        // Validation check for start date not earlier than today's date

        await axios.post("http://localhost:10000/roombookingdetails", {
          roomid: roomId,
          userfid: searchParams.get("userid"),
          roombookedfromdate: dateBooked,
          roombookedfromtime: timeBooked,
          roombookedtodate: toDate,
          roombookedtotime: toTime,
          bookedStatusFlag: 1,
        });
        window.location.reload(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formRoomName">
          <Form.Label>Room Name</Form.Label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="ddlRoom">
                Select Room
              </label>
            </div>
            <select
              class="custom-select"
              id="ddlRoom"
              style={{
                width: "343px",
                borderColor: "lightgray",
                borderRadius: "5px",
              }}
              onChange={handleChange}
              value={roomId}
            >
              <option value="">Select</option>
              {arrRooms.map((room) => (
                <option value={room.roomid}>{room.roomname}</option>
              ))}
            </select>
          </div>
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Start Date"
            value={dateBooked}
            onChange={handleDateChange}
          />
        </Form.Group>

        <Form.Group controlId="formTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Start Time"
            value={timeBooked}
            onChange={handleFromTimeChange}
          />
        </Form.Group>

        <Form.Group controlId="formReturnDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="End Date"
            value={toDate}
            onChange={handleToDateChange}
          />
        </Form.Group>

        <Form.Group controlId="formToTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="End Time"
            value={toTime}
            onChange={handleToTimeChange}
          />
        </Form.Group>

        <div style={{ height: "8px" }}></div>
        <Button
          style={{ backgroundColor: "#ef762b" }}
          type="submit"
          block
          onClick={saveRoomDetails}
        >
          Submit
        </Button>
      </Form>
    );
  };
  const handleDelete = (id) => {
    console.log("Room Id: ", id);
    try {
      axios.put(`http://localhost:10000/updateroombookingdetails?id=${id}`);
      alert(`Booking of room with id : ${id} is canceled`);
      window.location.reload(false);
    } catch (err) {}
  };
  return (
    <div>
      <div>
        <h1>Book a Room</h1>
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
          <div className="div-text">Book a Room</div>
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
            <RoomBookingDetails onSubmit={onRoomBookingSubmit} />
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
              <th>Room Name</th>

              <th>User Name</th>
              <th>Booked From Date</th>
              <th>Booked From Time</th>
              <th>Booked To Date</th>
              <th>Booked To Time</th>
            </tr>
          </thead>
          <tbody>
            {arrRoomDetails.map((roomDetail) => (
              <tr>
                <td>{roomDetail.roomname}</td>

                <td>{roomDetail.username}</td>
                <td>
                  {format(
                    new Date(roomDetail.roombookedfromdate),
                    "MMMM do yyyy"
                  )}
                </td>
                <td>{roomDetail.roombookedfromtime}</td>
                <td>
                  {format(
                    new Date(roomDetail.roombookedtodate),
                    "MMMM do yyyy"
                  )}
                </td>
                <td>{roomDetail.roombookedtotime}</td>
                <td>
                  <button
                    type="submit"
                    className="img-btn"
                    onClick={() => handleDelete(roomDetail.id)}
                    value={roomDetail.id}
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
export default RoomBooking;
