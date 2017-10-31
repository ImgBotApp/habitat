const convertKey = (string) => {
  let date = string.split(' ');
  let month = DATEKEY[date[0]];
  let day = date[1].replace(/th/, "").replace(/rd/, "").replace(/st/, "").replace(/nd/, "");
  let year = date[2] + "-";
  let newDate = year + month + day;
  return newDate
}

const DATEKEY = {
  January: "01-",
  Febuary: "02-",
  March: "03-",
  April: "04-",
  May: "05-",
  June: "06-",
  July: "07-",
  August: "08-",
  September: "09-",
  October: "10-",
  November: "11-",
  December: "12-"
}


module.exports = convertKey;
