import React from "react";
import "./styles.css";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingeProduct from "./SingeProduct";
import { Row } from "react-bootstrap";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformedProducts = () => {
    let filteredProducts = products;

    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (byFastDelivery) {
      filteredProducts = filteredProducts.filter((prod) => prod.fastDelivery);
    }
    if (!byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.inStock > 0);
    }
    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.ratings === byRating
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return filteredProducts;
  };

  return (
    <div className="home">
      <Filters />
      <Row className="products justify-content-around p-2">
        {transformedProducts().map((prod) => {
          return <SingeProduct key={prod.id} prod={prod} />;
        })}
      </Row>
    </div>
  );
};

export default Home;
