
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function formatDate(show_date) {
    let formattedDate;
    let dayName;
    
    // Parse the date string
    const showDate = new Date(show_date);

    // Format the date components
    formattedDate = showDate.getDate().toString().padStart(2, '0') + '-' + (showDate.getMonth() + 1).toString().padStart(2, '0') + '-' + showDate.getFullYear().toString();
    // Get the day name
    dayName = dayNames[showDate.getDay()];

    // Return the formatted date and day name as an object
    return { dayName, formattedDate };
}
