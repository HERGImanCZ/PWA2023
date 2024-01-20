import { useContext } from "react";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const {
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading
    } = useContext(AuthContext);

    return ( <>
    <Form onSubmit={loginUser}>
        <Row>
            <Col xs="6">
                <Stack gap="3">
                    <h2>Přihlášení</h2>

                    <Form.Control type="name" placeholder="uživatelské jméno" onChange = {(e) => 
                        updateLoginInfo({...loginInfo, name: e.target.value})}
                    />
                    <Form.Control type="password" placeholder="heslo" onChange = {(e) => 
                        updateLoginInfo({...loginInfo, password: e.target.value})}
                    />
                    <Button type="submit">{isLoginLoading ? "Probíhá přihlašování..." : "Přihlásit se"}</Button>
                    {
                        loginError?.error && <span className="text-danger">{loginError?.message}</span>
                    }  
                </Stack>
            </Col>
        </Row>
    </Form>
    </> );
}
 
export default Login;