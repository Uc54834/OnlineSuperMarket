import { useEffect, useState } from "react";
import API_BASE from "../api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/getCartItems`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const incrementQuantity = async (name) => {
    try {
      await fetch(`${API_BASE}/increase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } catch (err) {
      console.error("Failed to increment:", err);
    }
  };

  const removeItemByName = async (name) => {
    try {
      await fetch(`${API_BASE}/removeItem`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && Number(item.quantity || 1) > 1
          ? { ...item, quantity: Number(item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const removeItem = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    if (window.confirm("Clear your entire cart?")) setCartItems([]);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const subtotal    = cartItems.reduce((t, i) => t + Number(i.price || 0) * Number(i.quantity || 1), 0);
  const deliveryFee = subtotal > 2000 ? 0 : 150;
  const tax         = subtotal * 0.05;
  const total       = subtotal + deliveryFee + tax;

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert(`Order placed!\n\nSubtotal: Rs. ${subtotal}\nDelivery: Rs. ${deliveryFee}\nTax: Rs. ${tax.toFixed(2)}\nTotal: Rs. ${total.toFixed(2)}\n\nThank you!`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🛒</span>
        <h1 style={styles.title}>Your Shopping Cart</h1>
        <p style={styles.subtitle}>Review your items before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <span style={styles.emptyIcon}>🛍️</span>
          <p style={styles.emptyText}>Your cart is empty</p>
          <button style={styles.shopNowBtn} onClick={() => window.history.back()}>
            Shop Now
          </button>
        </div>
      ) : (
        <div style={styles.cartContainer}>
          {/* Items */}
          <div style={styles.cartItemsSection}>
            <div style={styles.cartHeader}>
              <h3>Cart Items ({cartItems.length})</h3>
              <button style={styles.clearCartBtn} onClick={clearCart}>Clear Cart</button>
            </div>

            {cartItems.map((item) => (
              <div key={item._id || item.id} style={styles.cartItem}>
                <div style={styles.itemImageContainer}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                </div>
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>Rs. {Number(item.price || 0)}</p>
                  <div style={styles.quantityControls}>
                    <button style={styles.quantityBtn} onClick={() => decreaseQuantity(item._id || item.id)}>-</button>
                    <span style={styles.quantity}>{Number(item.quantity || 1)}</span>
                    <button
                      style={styles.quantityBtn}
                      onClick={() => {
                        incrementQuantity(item.name);
                        increaseQuantity(item._id || item.id);
                      }}
                    >+</button>
                  </div>
                </div>
                <div style={styles.itemTotal}>
                  <p style={styles.totalText}>Total</p>
                  <p style={styles.totalAmount}>Rs. {Number(item.price || 0) * Number(item.quantity || 1)}</p>
                  <button
                    style={styles.removeBtn}
                    onClick={() => {
                      removeItemByName(item.name);
                      removeItem(item.name);
                    }}
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={styles.summarySection}>
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryRow}><span>Subtotal ({cartItems.length} items)</span><span>Rs. {subtotal}</span></div>
              <div style={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span style={deliveryFee === 0 ? styles.freeText : {}}>{deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}</span>
              </div>
              <div style={styles.summaryRow}><span>Tax (5%)</span><span>Rs. {tax.toFixed(2)}</span></div>
              <div style={styles.divider}></div>
              <div style={styles.summaryTotal}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>Rs. {total.toFixed(2)}</span>
              </div>
              {subtotal > 2000 && <div style={styles.freeDeliveryMsg}>🎉 Free Delivery! You saved Rs. 150</div>}
              <button style={styles.checkoutBtn} onClick={proceedToCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container:         { minHeight: "100vh", padding: "40px 20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", fontFamily: "Arial, sans-serif" },
  header:            { textAlign: "center", marginBottom: "40px" },
  headerIcon:        { fontSize: "50px", display: "block", marginBottom: "10px" },
  title:             { color: "white", fontSize: "36px", marginBottom: "10px" },
  subtitle:          { color: "rgba(255,255,255,0.9)", fontSize: "18px" },
  emptyCart:         { textAlign: "center", backgroundColor: "white", borderRadius: "15px", padding: "60px", maxWidth: "400px", margin: "0 auto" },
  emptyIcon:         { fontSize: "80px", display: "block", marginBottom: "20px" },
  emptyText:         { fontSize: "24px", color: "#666", marginBottom: "20px" },
  shopNowBtn:        { padding: "12px 30px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" },
  cartContainer:     { maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 350px", gap: "30px" },
  cartItemsSection:  { backgroundColor: "white", borderRadius: "15px", padding: "20px", boxShadow: "0 5px 20px rgba(0,0,0,0.1)" },
  cartHeader:        { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "15px", marginBottom: "15px", borderBottom: "2px solid #f0f0f0" },
  clearCartBtn:      { padding: "8px 15px", backgroundColor: "#ff6b6b", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" },
  cartItem:          { display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #eee", gap: "20px" },
  itemImageContainer:{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "10px", width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" },
  itemImage:         { width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" },
  itemDetails:       { flex: "1" },
  itemName:          { fontSize: "18px", color: "#333", marginBottom: "5px" },
  itemPrice:         { fontSize: "16px", color: "#2ecc71", fontWeight: "bold", marginBottom: "10px" },
  quantityControls:  { display: "flex", alignItems: "center", gap: "10px" },
  quantityBtn:       { width: "30px", height: "30px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "18px", fontWeight: "bold" },
  quantity:          { fontSize: "16px", fontWeight: "bold" },
  itemTotal:         { textAlign: "right", minWidth: "120px" },
  totalText:         { fontSize: "14px", color: "#666", marginBottom: "5px" },
  totalAmount:       { fontSize: "20px", color: "#333", fontWeight: "bold", marginBottom: "10px" },
  removeBtn:         { backgroundColor: "#ff6b6b", color: "white", border: "none", padding: "5px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" },
  summarySection:    { alignSelf: "start" },
  summaryCard:       { backgroundColor: "white", borderRadius: "15px", padding: "25px", boxShadow: "0 5px 20px rgba(0,0,0,0.1)" },
  summaryTitle:      { fontSize: "22px", color: "#333", marginBottom: "20px", textAlign: "center" },
  summaryRow:        { display: "flex", justifyContent: "space-between", padding: "10px 0", color: "#666", fontSize: "16px" },
  divider:           { height: "1px", backgroundColor: "#eee", margin: "15px 0" },
  summaryTotal:      { display: "flex", justifyContent: "space-between", margin: "20px 0", fontSize: "20px", fontWeight: "bold" },
  totalLabel:        { color: "#333" },
  totalValue:        { color: "#2ecc71" },
  checkoutBtn:       { width: "100%", padding: "15px", backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
  freeText:          { color: "#2ecc71", fontWeight: "bold" },
  freeDeliveryMsg:   { backgroundColor: "#d4edda", color: "#155724", padding: "10px", borderRadius: "5px", textAlign: "center", fontSize: "14px", marginTop: "15px" },
};

export default Cart;
