// import React from 'react';

const GetDate = () => {
    const today = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const date = today.getDate();
    // const time = today.getTime();
    return `${month} ${date} ${year}`;
}

export default GetDate;