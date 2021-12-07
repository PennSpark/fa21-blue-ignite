// Nav Bar Component
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Navbar,
  Container,
  Nav,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { MDBBtn, MDBIcon, MDBRipple } from "mdb-react-ui-kit";
import { ArrowRepeat, Search } from "react-bootstrap-icons";
import Cart from "./Cart";

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src="logo.png" alt="logo" style={{ height: 40 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto" style={{ maxHeight: "100px" }} navbarScroll>
              {/*<Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search for ideas..."
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="primary" size="sm">
                  <Search />
              </Button>
              </Form>*/}
              &nbsp;&nbsp;
            </Nav>
            <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip>
                    Shuffle all cards to get <strong>ignited</strong>! 🔥
                  </Tooltip>
                }
              >
                <MDBBtn
                  rippleCentered
                  color="primary"
                  outline
                  onClick={this.props.onNewLayout}
                >
                  <MDBIcon icon="redo" />
                </MDBBtn>
              </OverlayTrigger>
            {/*<Cart
              items={this.props.items}
              onTakeItem={this.props.onTakeItem}
              onClearItems={this.props.onClearItems}
            />*/}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
