import React, { useState } from 'react';

const CalendarSchedule = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  // Generate week based on the start date
  const generateWeekDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates(startDate);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <section className="bg-white p-6 shadow rounded">
      <h3 className="text-xl md:text-2xl font-bold mb-4">Schedule</h3>
      <div className="flex flex-wrap justify-between sm:justify-start">
        {weekDates.map((date) => (
          <div
            key={date.toISOString()}
            onClick={() => handleDayClick(date)}
            className={`cursor-pointer p-2 md:p-4 rounded text-center flex-1 mx-0 sm:mx-1 transition-colors duration-200
              ${selectedDate.toDateString() === date.toDateString() 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-800'
              }`}
            style={{ minWidth: "80px" }} // Ensures consistent sizing on mobile
          >
            <div className="text-xs md:text-sm font-medium">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-lg md:text-xl font-semibold">{date.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="date"
          value={startDate.toISOString().substr(0, 10)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="p-2 border rounded w-full sm:w-auto"
        />
      </div>
    </section>
  );
};

export default CalendarSchedule;
