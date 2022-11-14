
function Cart() {
  const token = localStorage.getItem('userToken');
  if (!token) {
    fetch('/api/cart/token', {
      method: 'POST'
    })
      .then(r => r.json())
      .then(r => {
        const { token } = r;
        localStorage.setItem('token', token);
      })
      .catch(err => console.error(err))
    ;
  }
}

export default Cart;
