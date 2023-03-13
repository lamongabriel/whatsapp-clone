export function formatDate(dt: string) {
  const date = new Date(dt);

  let hours = date.getHours();
  let minutes = date.getMinutes() as string | number;

  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const strTime = hours + ':' + minutes + ' ' + ampm;

  return strTime;
}
