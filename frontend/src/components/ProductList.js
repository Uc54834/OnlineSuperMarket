import { useEffect, useState } from "react";
import API_BASE from "../api";

function ProductList() {
  const [products, setProducts] = useState([]);

  const handleAddToCart = async (product) => {
    try {
      await fetch(`${API_BASE}/addToCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      alert(`${product.name} added to cart!`);
    } catch (err) {
      alert("Failed to add to cart. Is the backend running?");
    }
  };

  useEffect(() => {
    const supermarketProducts = [
      { id: 1,  name: "Fresh Apples",           price: 320,  image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300",  category: "Fruits" },
      { id: 2,  name: "Organic Bananas",         price: 120,  image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300",  category: "Fruits" },
      { id: 3,  name: "Fresh Strawberries",      price: 450,  image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=300",  category: "Fruits" },
      { id: 4,  name: "Broccoli",                price: 180,  image: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=300",  category: "Vegetables" },
      { id: 5,  name: "Carrots",                 price: 95,   image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300",  category: "Vegetables" },
      { id: 6,  name: "Fresh Milk 1L",           price: 210,  image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300",  category: "Dairy" },
      { id: 7,  name: "Cheddar Cheese",          price: 550,  image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=300",  category: "Dairy" },
      { id: 8,  name: "Whole Wheat Bread",       price: 160,  image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300",  category: "Bakery" },
      { id: 9,  name: "Free Range Eggs (6pcs)",  price: 280,  image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300",  category: "Dairy" },
      { id: 10, name: "Chicken Breast 500g",     price: 850,  image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300",  category: "Meat" },
      { id: 11, name: "Basmati Rice 5kg",        price: 1250, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",  category: "Grains" },
      { id: 12, name: "Coca Cola 1.5L",          price: 180,  image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300",  category: "Beverages" },
      { id: 13, name: "Potato Chips",            price: 120,  image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300",  category: "Snacks" },
      { id: 14, name: "Dark Chocolate",          price: 250,  image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300",  category: "Snacks" },
      { id: 15, name: "Orange Juice 1L",         price: 220,  image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300",  category: "Beverages" },
    ];
    setProducts(supermarketProducts);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🛒</span>
        <h2 style={styles.title}>Our Supermarket Products</h2>
        <p style={styles.subtitle}>Fresh &amp; Quality Products</p>
      </div>

      {products.length === 0 ? (
        <p style={styles.loading}>Loading products...</p>
      ) : (
        <div style={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.imageContainer}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productPrice}>Rs. {product.price}</p>
                <button
                  style={styles.addToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container:      { padding: "40px 20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh", fontFamily: "Arial, sans-serif" },
  header:         { textAlign: "center", marginBottom: "40px" },
  headerIcon:     { fontSize: "50px", display: "block", marginBottom: "10px" },
  title:          { color: "white", fontSize: "36px", marginBottom: "10px" },
  subtitle:       { color: "rgba(255,255,255,0.9)", fontSize: "18px" },
  loading:        { textAlign: "center", color: "white", fontSize: "20px", marginTop: "50px" },
  productGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" },
  productCard:    { backgroundColor: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.2)", cursor: "pointer" },
  imageContainer: { backgroundColor: "#f5f5f5", padding: "20px", textAlign: "center", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" },
  productImage:   { width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" },
  productInfo:    { padding: "20px", textAlign: "center" },
  productName:    { color: "#333", fontSize: "18px", marginBottom: "10px" },
  productPrice:   { color: "#2ecc71", fontSize: "22px", fontWeight: "bold", marginBottom: "15px" },
  addToCartBtn:   { padding: "10px 20px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" },
};

export default ProductList;
