import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getStartDay = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDay(currentMonth, currentYear);

  const calendarGrid = [];
  for (let i = 0; i < startDay - 1; i++) calendarGrid.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarGrid.push(day);

  return (
    <div style={{ backgroundColor: "#F7F5F2", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#2C2C2C", textAlign: "center" }}>Calendar Page</h1>

      {/* Upper Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        {/* Upload Section */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#6A1B9A" }}>Upload Files</h3>
          <p style={{ color: "#2C2C2C" }}>
            Drag and drop your files here or click the button to upload.
          </p>
          <button
            style={{
              backgroundColor: "#6A1B9A",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "coral")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6A1B9A")}
          >
            Browse File
          </button>
        </div>

        {/* Schedule Section */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            flex: 1,
            marginLeft: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#6A1B9A" }}>Schedule</h3>
          <p style={{ color: "#2C2C2C" }}>Plan your tasks efficiently.</p>
          <button
            style={{
              backgroundColor: "#6A1B9A",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "coral")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6A1B9A")}
          >
            Set Schedule
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "40px" }}>
        {/* Calendar Section */}
        <div style={{ flex: 2 }}>
          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              style={{
                backgroundColor: "#FF7043",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onClick={handlePrevMonth}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#6A1B9A")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF7043")}
            >
              Prev
            </button>
            <h3 style={{ color: "#2C2C2C" }}>
              {months[currentMonth]} {currentYear}
            </h3>
            <button
              style={{
                backgroundColor: "#FF7043",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onClick={handleNextMonth}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#6A1B9A")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FF7043")}
            >
              Next
            </button>
          </div>

          {/* Calendar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "10px",
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {days.map((day, index) => (
              <div key={index} style={{ color: "#6A1B9A", fontWeight: "bold", textAlign: "center" }}>
                {day}
              </div>
            ))}
            {calendarGrid.map((day, index) => (
              <div
                key={index}
                onClick={() => day && setSelectedDate(day)}
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "50%",
                  backgroundColor: day === selectedDate ? "#FF7043" : "#26A69A",
                  color: day ? "white" : "transparent",
                  fontWeight: "bold",
                  cursor: day ? "pointer" : "default",
                  transition: "all 0.3s ease",
                }}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>

        {/* Post Section */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#6A1B9A" }}>Your Post</h3>
            <img
              src="https://via.placeholder.com/150"
              alt="Post Placeholder"
              style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p style={{ color: "#2C2C2C" }}>
              Share your thoughts with the world! Click below to engage.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
                gap: "15px",
              }}
            >
              {/* Like Button */}
              <button
                onClick={() => setLikes(likes + 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  backgroundColor: "#6A1B9A",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <FaThumbsUp /> Like ({likes})
              </button>

              {/* Comment Button */}
              <button
                onClick={() => setComments(comments + 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  backgroundColor: "#26A69A",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <FaComment /> Comment ({comments})
              </button>

              {/* Share Button */}
              <button
                onClick={() => setShares(shares + 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  backgroundColor: "#FF7043",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <FaShare /> Share ({shares})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
