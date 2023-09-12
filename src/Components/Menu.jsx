import {Container, Row, Col, Stack, Modal, Button, Nav, Navbar, NavDropdown, Form} from 'react-bootstrap'
import Logo from '../../src/assets/img/ng2.png'

export default function Menu(){
  function handleLogout (){
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/dashboard">
            <img src={Logo} width="50px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="/lancamentos">Lançamentos</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Button onClick={()=> handleLogout()} className='btn-sair-menu' style={{marginBottom:"0", border:"none", color:"#999", textTransform:'capitalize'}} variant="outline-success">Sair</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}