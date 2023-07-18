import {Container, Row, Col, Stack, Modal, Button, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { MainContainer } from '../../../MainContainer'
import Menu from '../../../Components/Menu'
import '../../../App.css'
export default function Lancamentos(){
    return(
        <MainContainer>
            <Menu />
            <Container>
                <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <span style={{fontSize:'20px'}}>Em breve</span>
                </div>
            </Container>
        </MainContainer>
    )
}