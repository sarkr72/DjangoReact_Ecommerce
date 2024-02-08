import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  Container,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../actions/productActions";
import axios from "axios";
import Loader from "../components/Loader";

function ProductScreen({ match }) {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);

const addToCartHandler = () =>{
  navigate(`/cart/${id}/${qty}`);
}

  // const product = products.find((p) => p._id === id);
  return (
    <div>
      <Link to="/" className="btn btn-dark my-3">
        {" "}
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                    color={"#f8e825"}
                  />
                </ListGroupItem>

                <ListGroupItem>
                  <span>Price: </span>${product.price}
                </ListGroupItem>

                <ListGroupItem>
                  Description: ${product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col sx="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >

                            {
                             [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>
                                {x + 1}
                              </option>
                            ))
                            }

                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroup.Item className="d-flex">
                    <Button
                      className="btn-block flex-fill"
                      disabled={product.countInStock === 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductScreen;
