import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const List = () => {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  useEffect(() => {
    fetch("/booking/getAllBookings")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  const handleStatusChange = (event, id, type) => {
    const newStatus = event.target.value;

    // Update the status in your database
    fetch(`/booking/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [type]: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Then update the state
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === id ? { ...booking, [type]: newStatus } : booking
            )
          );
        } else {
          // Handle error
          console.error("Error updating status:", data.message);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Room ID</TableCell>
            <TableCell className="tableCell">Check-In Date</TableCell>
            <TableCell className="tableCell">Check-Out Date</TableCell>
            <TableCell className="tableCell">Booking Status</TableCell>
            <TableCell className="tableCell">Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell className="tableCell">{booking.user}</TableCell>
              <TableCell className="tableCell">
                {booking.room.join(", ")}
              </TableCell>
              <TableCell className="tableCell">
                {new Date(booking.checkInDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="tableCell">
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="tableCell">
                <Select
                  value={booking.bookingStatus}
                  onChange={(event) =>
                    handleStatusChange(event, booking._id, "bookingStatus")
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  {/* Add more options here */}
                </Select>
              </TableCell>
              <TableCell className="tableCell">
                <Select
                  value={booking.paymentStatus}
                  onChange={(event) =>
                    handleStatusChange(event, booking._id, "paymentStatus")
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                  {/* Add more options here */}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
