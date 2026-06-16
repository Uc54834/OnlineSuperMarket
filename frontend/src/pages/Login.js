import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function Login() {
  const navigate = useNavigate();
  const [data, setData]   = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.message || "Login failed");
        return;
      }
      localStorage.setItem("user", data.email);
      alert(result.message);
      navigate("/products");
    } catch (err) {
      setError("Cannot reach server. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrap}><span style={styles.icon}>👤</span></div>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          onChange={handleChange}
          name="email"
          placeholder="Email"
          style={styles.input}
        />
        <br /><br />
        <input
          onChange={handleChange}
          name="password"
          placeholder="Password"
          type="password"
          style={styles.input}
        />
        <br /><br />
        <button onClick={login} style={styles.btn}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "20px" },
  card:      { backgroundColor: "white", borderRadius: "15px", padding: "40px", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", textAlign: "center", maxWidth: "400px", width: "100%" },
  iconWrap:  { marginBottom: "20px", backgroundColor: "#3498db", width: "80px", height: "80px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "auto" },
  icon:      { fontSize: "50px", color: "white" },
  title:     { color: "#333", fontSize: "28px", marginBottom: "30px" },
  input:     { padding: "12px", width: "80%", fontSize: "16px", border: "1px solid #ddd", borderRadius: "5px", outline: "none", boxSizing: "border-box" },
  btn:       { padding: "12px 30px", fontSize: "16px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
  error:     { color: "red", marginBottom: "15px", fontSize: "14px" },
};

export default Login;
