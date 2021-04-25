import React from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { updateCart } from "../actions";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  hargaProducts = () => {
    let payment = 0;
    this.props.cart.forEach((element) => {
      payment += element.qty * element.price;
    });
    return payment.toLocaleString();
  };

  onBtRemoveCart = () => {
    this.props.cart.splice(0);
    axios
      .patch(`http://localhost:2021/users/${this.props.id}`, {
        cart: this.props.cart,
      })
      .then((response) => {
        this.props.updateCart([...this.props.cart]);
        alert("berhasil");
      })
      .catch((error) => {
        console.log("remove", error);
      });
  };
  printModal = () => {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <Button color="warning" onClick={this.onBtCheckout}>
            YES
          </Button>
          <Button
            color="danger"
            onClick={() =>
              this.setState({
                modal: false,
              })
            }
          >
            Cancel
          </Button>
        </ModalBody>
        <ModalFooter> </ModalFooter>
      </Modal>
    );
  };

  onBtCheckout = (index) => {
    let time = new Date();
    let iduser = this.props.id;
    let username = this.props.username;
    let date =
      time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear();
    let subTotal = this.hargaProducts();
    let status = "belum bayar";

    axios
      .post(`http://localhost:2021/transaction`, {
        iduser,
        username,
        date,
        subTotal,
        status,
      })
      .then((res) => {
        this.setState({ modal: false });
        this.onBtRemoveCart();

        if (this.props.cart.length === 0) {
          alert("Berhasil Melakukan Transaksi");
        }
      })
      .catch((err) => {
        console.log("Error add to cart:", err);
      });
  };

  onBtRemove = (index) => {
    this.props.cart.splice(index, 1);
    axios
      .patch(`http://localhost:2021/users/${this.props.id}`, {
        cart: this.props.cart,
      })
      .then(() => {
        this.props.updateCart([...this.props.cart]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printProducts = () => {
    return this.props.cart.map((item, index) => {
      return (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>
                <img src={item.img} style={{ width: "100px" }}></img>
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>
                <button type="button" onClick={() => this.onBtRemove(index)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      );
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {this.printProducts()}
            {this.printModal()}
          </div>
        </div>
        <div className="col-md-12">
          <p>Total Harga : {this.hargaProducts()}</p>
        </div>
        <div className="col-md-12">
          <button
            type="button"
            onClick={() =>
              this.setState({
                modal: true,
              })
            }
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducers, productReducers }) => {
  return {
    cart: authReducers.cart,
    id: authReducers.id,
    username: authReducers.username,
  };
};

export default connect(mapStateToProps, { updateCart })(CartPage);
