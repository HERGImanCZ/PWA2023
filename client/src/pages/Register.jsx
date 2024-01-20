import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

    const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);

    return ( 
    <>
    <Form onSubmit={registerUser}>
        <Row>
            <Col xs="6">
                <Stack gap="3">
                    <h2>Registrace</h2>

                    <Form.Control type="text" placeholder="uživatelské jméno" 
                        onChange={(e) => updateRegisterInfo({...registerInfo, name: e.target.value})}/>
                    <Form.Control type="password" placeholder="heslo" 
                        onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})}/>
                    <Form.Control type="password" placeholder="zopakujte heslo pro ověření"/>
                    <Button type="submit">{isRegisterLoading ? "Probíhá registrace..." : "Zaregistrovat se"}</Button>
                    {
                        registerError?.error && <span className="text-danger">{registerError?.message}</span>
                    }  
                </Stack>
            </Col>
        </Row>
    </Form>
    </> );
}
 
export default Register;