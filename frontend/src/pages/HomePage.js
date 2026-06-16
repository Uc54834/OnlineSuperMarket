import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconContainer}>
                    <span style={styles.shoppingIcon}>🛒</span>
                </div>
                <h1 style={styles.title}>Welcome to <span style={styles.highlight}>Online Super Market</span></h1>
                <p style={styles.subtitle}>Shop your daily needs easily</p>

                <div style={styles.buttons}>
                    <Link to="/login" style={styles.loginBtn}>
                        <span style={styles.btnIcon}>👤</span>
                        Login
                    </Link>

                    <Link to="/signup" style={styles.signupBtn}>
                        <span style={styles.btnIcon}>👥</span>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "20px"
    },
    card: {
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "50px 40px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        textAlign: "center",
        maxWidth: "450px",
        width: "100%"
    },
    iconContainer: {
        marginBottom: "20px"
    },
    shoppingIcon: {
        fontSize: "70px"
    },
    title: {
        color: "#333",
        fontSize: "28px",
        marginBottom: "15px"
    },
    highlight: {
        color: "#764ba2"
    },
    subtitle: {
        color: "#666",
        fontSize: "16px",
        marginBottom: "30px"
    },
    buttons: {
        marginTop: "20px"
    },
    loginBtn: {
        display: "inline-block",
        padding: "12px 30px",
        marginRight: "15px",
        backgroundColor: "#3498db",
        color: "white",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold"
    },
    signupBtn: {
        display: "inline-block",
        padding: "12px 30px",
        backgroundColor: "#2ecc71",
        color: "white",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold"
    },
    btnIcon: {
        marginRight: "8px"
    }
};

export default HomePage;