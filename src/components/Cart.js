import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, prod) => {
        return acc + Number(prod.price) * prod.qty;
      }, 0)
    );
  }, [cart]);

  return (
    <div className="cart d-flex justify-content-between p-2">
      <div className="productContainer mt-2 w-100">
        {cart.length > 0 ? (
          <ListGroup>
            {cart.map((prod) => {
              return (
                <ListGroup.Item key={prod.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={prod.image} fluid />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col>
                      <span>Rs {prod.price}</span>
                    </Col>
                    <Col>
                      <Rating rating={prod.ratings} />
                    </Col>
                    <Col>
                      <Form.Select
                        value={prod.qty}
                        onChange={(e) =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: prod.id,
                              qty: e.target.value,
                            },
                          })
                        }
                      >
                        {[...Array(6).keys()].map((x) => {
                          return <option key={x + 1}>{x + 1}</option>;
                        })}
                      </Form.Select>
                    </Col>
                    <Col>
                      {" "}
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
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        ) : (
          <div className="text-center h1">Cart is empty!</div>
        )}
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span className="h5">{`Total: Rs ${total}`}</span>
        <Button>Proceed to checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
