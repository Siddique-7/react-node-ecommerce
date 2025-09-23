export const startKeepAlive = (url, intervalMinutes = 10) => {
  setInterval(() => {
    fetch(url)
      .then(() => console.log('Pinged backend'))
      .catch(err => console.error('Ping error:', err));
  }, intervalMinutes * 60 * 1000);
};
