export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (true) {
      return { Authorization: 'Bearer ' + user.access_token };
    } else {
      return {};
    }
  }
  