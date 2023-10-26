import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "universityapp",
});

app.use(express.json());

app.use(cors());
// app.get("/", (req, res) => {
//   res.json("hello this is the backend");
// });

app.get("/vehicles", (req, res) => {
  const q = "SELECT * FROM vehicles";

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});

app.get("/userdetails", (req, res) => {
  const q = "SELECT * FROM userdetails ";

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const q = `SELECT * FROM userdetails WHERE username="${req.query.username}"`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.send(err);
    } else if (data) {
      res.send(data);
    } else {
      res.send({ message: "Incorrect username or password" });
    }
  });
});
app.get("/vehiclebookingdetails", (req, res) => {
  const q = `SELECT v.vehiclename as vehicleName,usr.username as userName, usr.userid as userId, vbd.bookeddate as bookedDate,vbd.bookedtime as bookedTime,vbd.returndate as returnDate FROM vehiclebookingdetails as vbd LEFT JOIN userdetails as usr ON vbd.userfid = usr.userid LEFT JOIN vehicles as v ON vbd.vregid = v.vid WHERE username ="${req.query.username}"`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.post("/vehiclebookingdetails", (req, res) => {
  const q =
    "INSERT INTO vehiclebookingdetails (`vregid`,`userfid`,`bookeddate`,`bookedtime`,`returndate`) VALUES (?)";
  const values = [
    req.body.vregid,
    req.body.userfid,
    req.body.bookeddate,
    req.body.bookedtime,
    req.body.returndate,
  ];
  console.log("Values: ", values);
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Vehicle details inserted successfully");
  });
});

app.get("/counsellors", (req, res) => {
  const q = "SELECT * FROM counsellordetails";

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.get("/counsellorbookingdetails", (req, res) => {
  const q = `SELECT c.counsellorname,usr.username, usr.userid, cd.bookingfromdate,cd.bookingfromtime,cd.bookedtodate FROM universityapp.counsellorbookingdetails as cd LEFT JOIN universityapp.userdetails as usr ON cd.userid = usr.userid LEFT JOIN universityapp.counsellordetails as c ON cd.counsellorid = c.counsellorid  WHERE username ="${req.query.username}"`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.post("/counsellorbookingdetails", (req, res) => {
  const q =
    "INSERT INTO counsellorbookingdetails (`counsellorid`,`userid`,`bookingfromdate`,`bookingfromtime`,`bookedtodate`) VALUES (?)";
  const values = [
    req.body.counsellorid,
    req.body.userid,
    req.body.bookingfromdate,
    req.body.bookingfromtime,
    req.body.bookedtodate,
  ];
  console.log("Values: ", values);
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Counsellor details inserted successfully");
  });
});

app.get("/rooms", (req, res) => {
  const q = "SELECT * FROM roomdetails";

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.get("/roombookingdetails", (req, res) => {
  const q = `SELECT r.roomname,r.roomcapacity,usr.username, usr.userid, rd.roombookedfromdate,rd.roombookedfromtime,rd.roombookedtodate, rd.roombookedtotime
  FROM roombookingdetails as rd
  LEFT JOIN userdetails as usr 
  ON rd.userfid = usr.userid
  LEFT JOIN roomdetails as r
  ON rd.roomid = r.roomid  WHERE username ="${req.query.username}"`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.post("/roombookingdetails", (req, res) => {
  const q =
    "INSERT INTO roombookingdetails (`roomid`,`userfid`,`roombookedfromdate`,`roombookedfromtime`,`roombookedtodate`,`roombookedtotime`) VALUES (?)";
  const values = [
    req.body.roomid,
    req.body.userfid,
    req.body.roombookedfromdate,
    req.body.roombookedfromtime,
    req.body.roombookedtodate,
    req.body.roombookedtotime,
  ];
  console.log("Values: ", values);
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Room details inserted successfully");
  });
});

app.listen(8000, () => {
  console.log("Connected to backend!!!");
});
