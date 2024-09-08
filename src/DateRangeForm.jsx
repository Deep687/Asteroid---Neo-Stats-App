import { useState } from "react";
import PropTypes from "prop-types";

// DateRangeForm component for selecting start and end dates
const DateRangeForm = ({ onSubmit }) => {
  // State hooks for managing start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      console.log(`Submitting date range: ${startDate} to ${endDate}`);
      onSubmit(startDate, endDate);
    } else {
      console.warn("Start date or end date is missing");
    }
  };

  // CSS class for input fields
  const inputClass =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Fetch Asteroid Data
      </button>
    </form>
  );
};

DateRangeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DateRangeForm;
