
export default function extractTime( timestamp ) {
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');


    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
}