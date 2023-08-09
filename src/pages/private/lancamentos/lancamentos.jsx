import {Container, Row, Col, Stack, Modal, Button, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { MainContainer } from '../../../MainContainer'
import Menu from '../../../Components/Menu'
import '../../../App.css'
import LancamentosAll from '../../../Components/LancamentosAll'
export default function Lancamentos(){


    return(
        <MainContainer>
            <Menu />
            <Container>
                <LancamentosAll />
            </Container>
        </MainContainer>
    )
}