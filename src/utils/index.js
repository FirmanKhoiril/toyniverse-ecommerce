export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export const formatedTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate
}


export const formatPrice = (price) => {
  return price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};