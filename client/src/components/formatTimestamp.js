export default function FormatTimestamp(date) {
    // convert UNIX timestamp to SQL timestamp
    const hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();

    function pad(date) {return (date < 10 ? "0" : "") + date;}
    const formattedDate = pad(year) + "-" + pad(month) + "-" + pad(day) + " " + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

    return formattedDate
}
