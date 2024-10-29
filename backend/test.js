const crypto = require('crypto');

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};


// Usage
const hashedToken = hashToken('buoub')
 
console.log(hashedToken);