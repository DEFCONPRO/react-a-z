import { useContext, useState } from 'react';
import FeedbackContext from '../../context/FeedbackContext';
import Card from '../shared/Card';
import closeIcon from '../../images/closeIcon.svg';
import editIcon from '../../images/editIcon.svg';

const FeedbackItem = ({ item }) => {
  const { deleteFeedback, editFeedback, isFalse } = useContext(FeedbackContext);
  const inputDate = item.date;

  // Create a Date object from the input string
  const dateObject = new Date(inputDate);

  // Define an array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the month, day, and year components from the Date object
  const monthName = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const calendar = `${monthName} ${day}, ${year}`;


  const [is24HourFormat, setIs24HourFormat] = useState(true);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    if (is24HourFormat) {
      return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    } else {
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      const twelveHourFormat = (hours % 12 || 12).toString().padStart(2, '0');
      return `${twelveHourFormat}:${minutes}:${seconds} ${amOrPm}`;
    }
  };

  const handleTimeToggle = () => {
    setIs24HourFormat((prevFormat) => !prevFormat);
  };

  const handleDeleteButton = () => {
    deleteFeedback(item._id);
  };

  const handleEditButton = () => {
    editFeedback(item);
  };

  return (
    <Card reverse={isFalse}>
      <div className='num-display'>{item.rating}</div>
      <button onClick={handleDeleteButton} className='close'>
        <img src={closeIcon} alt='close icon' width={13.328} height={13.328} />
      </button>
      <button onClick={handleEditButton} className='edit'>
        <img src={editIcon} alt='edit icon' width={13.328} height={13.328} />
      </button>
      <div className='text-display'>{item.text}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          top: 35,
        }}
      >
        <h5>{calendar}</h5>
        <h5 style={{cursor: 'pointer'}} onClick={handleTimeToggle}>{formatTime(dateObject)}</h5>
      </div>
    </Card>
  );
};

export default FeedbackItem;
