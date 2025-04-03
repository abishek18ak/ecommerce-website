import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container, Chip } from '@mui/material';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([
    {
      _id: '1',
      name: 'Casual T-Shirt',
      price: 20,
      category: 'T-Shirts',
      image: 'https://www.mydesignation.com/cdn/shop/files/malayali-995158.jpg?v=1716279280', 
      description: 'Comfortable cotton t-shirt, perfect for everyday wear.',
    },
    {
      _id: '2',
      name: 'Denim Jacket',
      price: 50,
      category: 'Jackets',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/10/PU/FH/RY/162001345/men-cotton-t-shirt-500x500.jpg',
      description: 'Classic blue denim jacket with a modern fit.',
    },
    {
      _id: '3',
      name: 'Shorts',
      price: 30,
      category: 'Shorts',
      image: 'https://assets.ajio.com/medias/sys_master/root/20240607/jdXa/6662b8e205ac7d77bba71fbc/-473Wx593H-465756713-brown-MODEL.jpg',
      description: 'Shorts for men.',
    },
    {
      _id: '4',
      name: 'HP Laptop',
      price: 800,
      category: 'Laptop',
      image: 'https://ecom.myitworld.com/media/catalog/product/cache/2be1954f74caba3fffe9c28ffd4d15a6/h/p/hp-pavilion-x360-2-in-1-laptop-14-ek1010tu-it-world-4845_vho1p63dnhbfzzvc_1_1.png',
      description: 'Hp pavilion 360x Touch Screen.',
    },
    {
      _id: '5',
      name: 'BOAT Earbuds',
      price: 20,
      category: 'earbuds',
      image: 'https://www.boat-lifestyle.com/cdn/shop/files/niravana_space_main_img_v2.jpg?v=1721368479', 
      description: 'Comfortable cotton t-shirt, perfect for everyday wear.',
    },
    {
      _id: '6',
      name: 'Rolex Watch',
      price: 500,
      category: 'Watch',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAOXlpk1vSh01lL4UTU1hG7MHzgnogUw5kA&s',
      description: 'Rolex watch for men.',
    },
    {
      _id: '7',
      name: 'Minimalist Sunscreen',
      price: 10,
      category: 'Cosmetics',
      image: 'https://www.newu.in/cdn/shop/files/1_341d0e96-94eb-44a6-92e1-1fc1a1052aaf_1024x1024.jpg?v=1737721310', 
      description: 'Use Sunscreen everyday .',
    },
    {
      _id: '8',
      name: 'Nykaa Lipsticks',
      price: 5,
      category: 'Cosmetics',
      image: 'https://nicka.com/cdn/shop/products/HYDRO-LIPSTICK_2048x2048.jpg?v=1609861857', 
      description: 'Lipsticks.',
    },
    {
      _id: '9',
      name: ' Woodland Shoes',
      price: 30,
      category: 'Footwear',
      image: 'https://assets.woodlandworldwide.app/product/images/FGC0L80R7421Z/CAMEL/FGC0L80R7421Z_010_0.webp', 
      description: 'Footwear, perfect for everyday wear.',
    },
    
  ]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary">
        Featured Products
      </Typography>
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 5,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 280,
                  objectFit: 'cover',
                }}
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  ${product.price}
                </Typography>
                <Chip label={product.category} color="secondary" variant="outlined" sx={{ mb: 1 }} />
                <Typography variant="body2">{product.description}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 2 }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
