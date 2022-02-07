import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <FormControl
          placeholder="Search a product"
          onChange={(e) =>
            productDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value,
            })
          }
          className="m-auto"
          style={{ width: "500px" }}
        />
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="success"
              className="d-flex align-items-center"
            >
              <FaShoppingCart color="white" size="25px" />
              <Badge bg="success">{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: "370px" }}>
              {cart.length > 0 ? (
                cart.map((prod) => (
                  <div
                    className="d-flex border-bottom border-dark py-2"
                    key={prod.id}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-25 mx-2 circle"
                    />
                    <div className="d-flex flex-column flex-grow-1 gap-2">
                      <div>
                        <span>{prod.name}</span>
                      </div>
                      <div>
                        <span>Rs {prod.price.split(".")[0]}</span>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: prod })
                      }
                      className="align-self-center me-2"
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        alignSelf: "center",
                      }}
                    >
                      <AiFillDelete />
                    </Button>
                  </div>
                ))
              ) : (
                <span style={{ padding: "10px" }}>Cart is emty</span>
              )}
              {cart.length > 0 && (
                <Link to="/cart" className="mt-2 mx-2 d-grid">
                  <Button>Go to cart</Button>
                </Link>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
