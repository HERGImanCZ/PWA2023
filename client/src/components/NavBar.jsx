import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext);
    
    return ( <Navbar className="mb-4 navbar">
        <Container>
            <h2>MůjChat</h2>
            {user && <span className="text-warning">Přihlášen uživatel {user?.name}</span>}
            {!user && <span className="text-warning">Pro chatování je potřeba se přihlásit</span>}
            <Nav>
                <Stack direction="horizontal" gap="5">
                    <Link to="/" className="text-decoration-none">Chat</Link>
                    {
                        user && (<>
                            <Link onClick={() => logoutUser()} to="/login" className="text-decoration-none">Odhlásit se</Link>
                        </>)
                    }

                    {!user && (<>
                        <Link to="/login" className="text-decoration-none">Přihlásit se</Link>
                        <Link to="/register" className="text-decoration-none">Zaregistrovat se</Link>
                    </>)}
                </Stack>
            </Nav>
        </Container>
    </Navbar> );
}
 
export default NavBar;