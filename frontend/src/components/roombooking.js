import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import addIcon from "../assets/addicon.jpg";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

const RoomBooking = ({ route }) => {
  const [show, setShow] = useState(false);
  const [roomDetails, setRoomDetails] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [users, setUsers] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const onRoomBookingSubmit = (e) => {
    e.preventDefault();
    handleHide();
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/roombookingdetails?username=${searchParams.get(
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
        const res = await axios.get("http://localhost:8000/rooms");
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
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

  const arrRoomDetails = Object.values(roomDetails);
  const arrRooms = Object.values(rooms);

  const RoomBookingDetails = ({ onSubmit }) => {
    const [roomId, setRoomId] = useState("");
    const [dateBooked, setDateBooked] = useState("");
    const [timeBooked, setTimeBooked] = useState("");
    const [toDate, setToDate] = useState("");
    const [toTime, setToTime] = useState("");

    function handleChange(event) {
      setRoomId(event.target.value);
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
        await axios.post("http://localhost:8000/roombookingdetails", {
          roomid: roomId,
          userfid: searchParams.get("userid"),
          roombookedfromdate: dateBooked,
          roombookedfromtime: timeBooked,
          roombookedtodate: toDate,
          roombookedtotime: toTime,
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
              {arrRooms.map((room) => (
                <option value={room.roomid}>{room.roomname}</option>
              ))}
            </select>
            <p>{roomId}</p>
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
        <p>{dateBooked}</p>
        <Form.Group controlId="formTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Start Time"
            value={timeBooked}
            onChange={handleFromTimeChange}
          />
        </Form.Group>
        <p>{timeBooked}</p>
        <Form.Group controlId="formReturnDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="End Date"
            value={toDate}
            onChange={handleToDateChange}
          />
        </Form.Group>
        <p>{toDate}</p>
        <Form.Group controlId="formToTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="End Time"
            value={toTime}
            onChange={handleToTimeChange}
          />
        </Form.Group>
        <p>{toTime}</p>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default RoomBooking;
