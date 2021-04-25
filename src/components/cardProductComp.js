// import axios from "axios";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { updateCart } from "../actions";

class CardProductComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.products,
      qty: 1,
      disabled: "true",
      key: true,
    };
  }
  componentDidUpdate() {
    if (this.props.products.length > 0 && this.state.key) {
      this.setState({
        data: this.props.products,
        key: false,
        modal: false,
      });
    }
  }
  onBtAddToCart = (idx) => {
    let name = this.props.products[idx].name;
    let stock = this.props.products[idx].stock;
    let price = this.props.products[idx].price;
    let qty = parseInt(prompt("silahkan inputkan stock"));
    let img = this.props.products[idx].img;
    if (qty < this.props.products[idx].stock) {
      if (this.props.id) {
        let cart = {
          name: name,
          stock: stock,
          price: price,
          qty: qty,
          img: img,
        };
        this.props.cart.push(cart);
        axios
          .patch(`http://localhost:2021/users/${this.props.id}`, {
            cart: this.props.cart,
          })
          .then((res) => {
            alert("sukses");
            this.props.updateCart([...this.props.cart]);
          })
          .catch((err) => {
            console.log("ERROR NIH", err);
          });
      } else {
        this.setState({ modal: !this.state.modal });
      }
    }
  };
  printModal = () => {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          LOGIN TERLEBIH DAHULU UNTUK MEMASUKKAN STOCK YANG TERSEDIA
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              this.setState({
                modal: false,
              })
            }
          >
            OK
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  };

  printBarang = () => {
    return this.props.products.map((item, idx) => {
      return (
        <Col md="4">
          <Card>
            <CardImg top width="100%" src={item.img} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">{item.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Price: {item.price} stock:{item.stock}{" "}
              </CardSubtitle>
              <CardText>{item.description}</CardText>
              <Button onClick={() => this.onBtAddToCart(idx)}>
                Add To Cart
              </Button>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };
  render() {
    console.log(this.props.products, "belum");
    return (
      <div className="container-fluid row">
        {this.printModal()}
        {this.printBarang()}
      </div>
    );
  }
}
const mapStateToProps = ({ productReducers, authReducers }) => {
  return {
    user: authReducers,
    products: productReducers.product_list,
    id: authReducers.id,
    cart: authReducers.cart,
  };
};

export default connect(mapStateToProps, { updateCart })(CardProductComp);
