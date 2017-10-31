const convertDate = (string) => {

  let idx = string.indexOf(',');
  let date = string.slice(0, idx).split(' ');
  let month = DATEKEY[date[0]];
  let day = date[1].replace(/th/, "/").replace(/rd/, "/").replace(/st/, "/").replace(/nd/, "/");
  let year = date[2].slice(2);

  let time = string.slice(idx + 2, string.length).split(' ');
  let timeIdx = time[0].indexOf(':');
  let hour = time[0].slice(0, timeIdx);
  let minute = time[0].slice(timeIdx, time[0].length);
  if (time[1] === 'pm') {
    hour = Number(hour) + 12;
    hour.toString()
  }

  let convert = month + day + year + ' ' + hour + minute;
  let dateValue = new Date(convert);
  return dateValue
}

const DATEKEY = {
  January: "01/",
  Febuary: "02/",
  March: "03/",
  April: "04/",
  May: "05/",
  June: "06/",
  July: "07/",
  August: "08/",
  September: "09/",
  October: "10/",
  November: "11/",
  December: "12/"
}


module.exports = convertDate;
