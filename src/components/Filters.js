import React from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./styles.css";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, byRating },
    productDispatch,
  } = CartState();

  return (
    <div className="filters flex-shrink-0">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          label="Ascending"
          name="group1"
          type="radio"
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
          }
        />
      </span>
      <span>
        <Form.Check
          label="Descending"
          name="group1"
          type="radio"
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
          }
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          checked={byStock}
          onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          checked={byFastDelivery}
          onChange={() => productDispatch({ type: "FILTER_BY_DELIVERY" })}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onRatingStarClick={productDispatch}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
