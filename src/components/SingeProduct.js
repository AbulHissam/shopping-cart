import React from "react";
import "./styles.css";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const SingeProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="mb-2 col-sm-12 col-md-6 col-xl-4">
      <Card className="shadow">
        <Card.Img variant="top" src={prod.image} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle className="mt-2 d-flex flex-column gap-2">
            <span>Rs {prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <div>
              <Rating className rating={prod.ratings} />
            </div>
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="p-md-1 d-flex align-items-center justify-content-center">
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: prod })
              }
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              disabled={!prod.inStock}
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: prod })}
            >
              {prod.inStock ? "Add to cart" : "Out of stock"}
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingeProduct;
