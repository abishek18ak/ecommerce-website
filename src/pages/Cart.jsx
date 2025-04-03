import { useCart } from '../context/CartContext';
import { Container, Typography, Grid, Card, CardContent, Button, TextField } from '@mui/material';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', maxWidth: '150px' }} />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography>${item.price}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                          inputProps={{ min: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;