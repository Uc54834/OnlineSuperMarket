import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar">
            <h1>Online Super Market</h1>

            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="/cart">Cart</a>
            </div>
        </div>
    );
}

export default Navbar;