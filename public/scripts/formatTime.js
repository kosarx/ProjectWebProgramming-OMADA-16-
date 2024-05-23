
export function formatTime(timeString) {

    // Split the time string into hours, minutes, and seconds
    let [hours, minutes, seconds] = timeString.split(':');

    // Convert the hours to a 12-hour format with AM/PM indication
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;

    // Construct the formatted time string
    let formattedTime = hours + ':' + minutes + ' ' + ampm;
    
    return formattedTime;
}


