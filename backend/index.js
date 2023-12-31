import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();
console.log(
  "Host: ",
  process.env.HOST,
  ", User: ",
  process.env.USER,
  "Database: ",
  process.env.DATABASE,
  ", Password: ",
  process.env.PASSWORD
  // "DB_Port: ",
  // process.env.DB_PORT
);
const port = process.env.PORT || 10000;
const db = mysql.createConnection({
  // const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  // connectionLimit: 10,
  // db_port: process.env.DB_PORT,
});
// db.connect((err) =>
db.connect((err) => {
  if (err) {
    console.error("Error connecting db: " + err.message);
    return;
  }
  console.log("Connected as id " + db.threadId);
});

app.use(express.json());

app.use(cors());

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
  const q = "SELECT * FROM userdetails "; //ttt

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
  console.log("Request: ", req);
  const q = `SELECT vbd.vbookingid as id,v.vehiclename as vehicleName,usr.username as userName, usr.userid as userId, vbd.bookeddate as bookedDate,vbd.bookedtime as bookedTime,vbd.returndate as returnDate FROM vehiclebookingdetails as vbd LEFT JOIN userdetails as usr ON vbd.userfid = usr.userid LEFT JOIN vehicles as v ON vbd.vregid = v.vid WHERE username ="${req.query.username}" AND bookedStatusFlag = 1`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.put("/updatevehiclebookingdetails", (req, res) => {
  console.log("ID: ", req.query.id);
  const q = `UPDATE vehiclebookingdetails SET bookedStatusFlag = 0 WHERE vbookingid=${req.query.id}`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Booking cancelled successfully");
  });
});
app.post("/vehiclebookingdetails", (req, res) => {
  const q =
    "INSERT INTO vehiclebookingdetails (`vregid`,`userfid`,`bookeddate`,`bookedtime`,`returndate`,`bookedStatusFlag`) VALUES (?)";
  const values = [
    req.body.vregid,
    req.body.userfid,
    req.body.bookeddate,
    req.body.bookedtime,
    req.body.returndate,
    req.body.bookedStatusFlag,
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
  const q = `SELECT cd.counsellorbookingid as id,c.counsellorname,usr.username, usr.userid, cd.bookingfromdate,cd.bookingfromtime,cd.bookedtodate FROM universityapp.counsellorbookingdetails as cd LEFT JOIN universityapp.userdetails as usr ON cd.userid = usr.userid LEFT JOIN universityapp.counsellordetails as c ON cd.counsellorid = c.counsellorid  WHERE username ="${req.query.username}" AND cd.bookedStatusFlag=1;`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.put("/updatecounsellorbookingdetails", (req, res) => {
  console.log("ID: ", req.query.id);
  const q = `UPDATE counsellorbookingdetails SET bookedStatusFlag = 0 WHERE counsellorbookingid=${req.query.id}`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Booking cancelled successfully");
  });
});
app.post("/counsellorbookingdetails", (req, res) => {
  const q =
    "INSERT INTO counsellorbookingdetails (`counsellorid`,`userid`,`bookingfromdate`,`bookingfromtime`,`bookedtodate`,`bookedStatusFlag`) VALUES (?)";
  const values = [
    req.body.counsellorid,
    req.body.userid,
    req.body.bookingfromdate,
    req.body.bookingfromtime,
    req.body.bookedtodate,
    req.body.bookedStatusFlag,
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
  const q = `SELECT rd.roombookingid as id,r.roomname,r.roomcapacity,usr.username, usr.userid, rd.roombookedfromdate,rd.roombookedfromtime,rd.roombookedtodate, rd.roombookedtotime
  FROM roombookingdetails as rd
  LEFT JOIN userdetails as usr 
  ON rd.userfid = usr.userid
  LEFT JOIN roomdetails as r
  ON rd.roomid = r.roomid  WHERE username ="${req.query.username}" AND rd.bookedStatusFlag = 1`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json(data);
  });
});
app.post("/roombookingdetails", (req, res) => {
  const q =
    "INSERT INTO roombookingdetails (`roomid`,`userfid`,`roombookedfromdate`,`roombookedfromtime`,`roombookedtodate`,`roombookedtotime`,`bookedStatusFlag`) VALUES (?)";
  const values = [
    req.body.roomid,
    req.body.userfid,
    req.body.roombookedfromdate,
    req.body.roombookedfromtime,
    req.body.roombookedtodate,
    req.body.roombookedtotime,
    req.body.bookedStatusFlag,
  ];
  console.log("Values: ", values);
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Room details inserted successfully");
  });
});

app.put("/updateroombookingdetails", (req, res) => {
  console.log("ID: ", req.query.id);
  const q = `UPDATE roombookingdetails SET bookedStatusFlag = 0 WHERE roombookingid=${req.query.id}`;

  db.query(q, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.json(err);
    } else return res.json("Booking cancelled successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
