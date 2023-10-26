import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import vehicle from "../assets/Car-book-img.jpg";
import counsellor from "../assets/counsellor-book-img.jpg";
import room from "../assets/room-book-img.jpg";
const Services = () => {
  const navigate = useNavigate();
  const [usrName, setUsrName] = useState("");
  const [psw, setPsw] = useState("");
  const [usrId, setUsrId] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setUsrName(searchParams.get("username"));
    setPsw(searchParams.get("password"));
    setUsrId(searchParams.get("userid"));
  }, [searchParams]);
  console.log("Username: ", usrName, "Password: ", psw, "Userid: ", usrId);
  const handleClick = (e) => {
    // Now you can navigate programmatically to other pages using navigate
    if (e.target.value === "vehicle") {
      navigate({
        pathname: "/vehiclebooking",
        search: createSearchParams({
          id: "vehicle",
          username: usrName,
          password: psw,
          userid: usrId,
        }).toString(),
      });
    } else if (e.target.value === "counsellor") {
      navigate({
        pathname: "/counsellorbooking",
        search: createSearchParams({
          id: "counsellor",
          username: usrName,
          password: psw,
          userid: usrId,
        }).toString(),
      });
    } else if (e.target.value === "room") {
      navigate({
        pathname: "/roombooking",
        search: createSearchParams({
          id: "room",
          username: usrName,
          password: psw,
          userid: usrId,
        }).toString(),
      });
    }
  };
  return (
    <div class="card-group">
      <div class="card text-start">
        <img class="card-img-top" src={vehicle} alt="vehicle" />
        <div class="card-body">
          <h5 class="card-title">Vehicle Booking</h5>
          <p class="card-text">
            Step into a world of convenience with our Vehicle Booking Service.
            Whether you need a quick ride or a road trip companion, this
            user-friendly service has you covered. Browse a diverse fleet, book
            with a few taps, and track your ride in real-time. Safety is our
            priority, and with seamless payments, your journey becomes as
            enjoyable as the destination. Your ride, your way.
          </p>
          <p class="card-text">
            <button
              type="button"
              class="btn btn-dark"
              value="vehicle"
              onClick={handleClick}
            >
              Book a Vehicle
            </button>
          </p>
        </div>
      </div>
      <div class="card text-start">
        <img class="card-img-top" src={counsellor} alt="counsellor" />
        <div class="card-body">
          <h5 class="card-title">Counsellor Booking</h5>
          <p class="card-text">
            Introducing the ultimate counseling booking service, your path to
            mental well-being made simple. This user-friendly platform connects
            you with qualified counselors, letting you schedule sessions that
            fit your life. Explore profiles, choose your perfect match, and
            embark on a journey to self-discovery and growth. Your mental
            health, your way.
          </p>
          <p class="card-text">
            <button
              type="button"
              class="btn btn-dark"
              value="counsellor"
              onClick={handleClick}
            >
              Schedule meeting with Counsellor
            </button>
          </p>
        </div>
      </div>
      <div class="card text-start">
        <img class="card-img-top" src={room} alt="room" />
        <div class="card-body">
          <h5 class="card-title">Room Booking</h5>
          <p class="card-text">
            Welcome to the Room Booking Service, where securing your ideal
            learning space is just a click away. Effortlessly browse available
            rooms, choose the perfect one for your needs, and schedule with
            ease. Real-time updates and user-friendly features ensure a smooth
            process, putting the control of your educational environment in your
            hands. Education made convenient.
          </p>
          <p class="card-text">
            <button
              type="button"
              class="btn btn-dark"
              value="room"
              onClick={handleClick}
            >
              Book a Room
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
