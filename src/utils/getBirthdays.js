import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import getDayDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';

const dates = (current) => {
  let week = new Array();
  // Starting Monday not Sunday
  current.setDate(current.getDate() - current.getDay() + 1);
  for (const i = 0; i < 7; i++) {
    week.push(current);
    current.setDate(getDayDate(current) + 1);
  }
  return week;
};

export default function getBirthdays(bioData) {
  const todaysDate = new Date();

  const data = bioData.map((data) => data);
  console.log('data: ', JSON.stringify(data));

  // const data = bioData.map((data) => {
  //   const day = getDayDate(data.dob);
  //   const month = getMonth(data.dob);
  //   return `${day}-${month}`;
  // });
  // console.log('data: ', data);

  //   const Weekday = dates(new Date());
  //   console.log('Weekday: ', Weekday);

  //   const startWeek = startOfWeek(todaysDate);
  //   const endWeek = endOfWeek(todaysDate);

  const weekDays = dates(new Date());
  console.log(
    'weekDays: ',
    weekDays.map((d) => d.toString()),
  );
  //   const dataWeek = weekDays.map((data) => {
  //     return `${getDate(data)}-${getMonth(data)}`;
  //   });
  //   console.log('dataWeek: ', dataWeek);
}

// 2021-07-13T12:12:48.114Z
// 2004-01-21T19:02:29.000Z
