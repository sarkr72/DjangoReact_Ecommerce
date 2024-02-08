import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useParams, useNavigate } from "react-router-dom";

export default function CartScreen() {
  const { id, qty } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

const checkoutHandler = () => {
navigate(`/;ogin?redirect=shipping`)
}

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <h3>
            Your Cart is empty <Link to="/">Go Back</Link>
          </h3>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(
              (item) =>
                // Conditionally render ListGroup.Item only if item is not null
                item && (
                  <ListGroup.Item key={item?.product}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        {/* Add error handling to prevent potential errors */}
                        <Link to={`/product/${item?.product}`}>
                          {item?.name}
                        </Link>
                      </Col>

                      <Col md={2}>{item?.price}</Col>

                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"> </i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
            )}
          </ListGroup>
        )}
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              <span>
                {/* Calculate and display subtotal price */}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-center">
              {/* Proceed to checkout button */}
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
