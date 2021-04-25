import React from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let history = [];
    axios
      .get(`http://localhost:2021/transaction`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
        this.res.data.map((item, index) => {
          if (item.iduser == this.props.id) {
            history.push(item.iduser);
          }
        });
      })
      .catch((err) => {
        console.log(err, "error lagi ya");
      });
  };
  onBtRemove = (index) => {
    this.props.cart.splice(index, 1);
    axios
      .patch(`http://localhost:2021/transaction/${this.props.id}`, {
        cart: this.props.cart,
      })
      .then(() => {
        this.props.updateCart([...this.props.cart]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  printBarang = () => {
    return this.setState.data.map((item, index) => {
      return (
        <Table>
          <thead>
            <tr>
              <th>id user</th>
              <th>username</th>
              <th>date</th>
              <th>subtotal</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{item.iduser}</th>
              <th>{item.username}</th>
              <th>{item.date}</th>
              <th>{item.subTotal}</th>
              <th>{item.status}</th>
            </tr>
          </tbody>
        </Table>
      );
    });
  };
  render() {
    return this.state.data.map((item, index) => {
      if (item.iduser == this.props.id) {
        return (
          <Table>
            <thead>
              <tr>
                <th>id user</th>
                <th>username</th>
                <th>date</th>
                <th>subtotal</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.iduser}</td>
                <td>{item.username}</td>
                <td>{item.date}</td>
                <td>{item.subtotal}</td>
                <td>{item.status}</td>

                <td>
                  {" "}
                  <button type="button" onClick={() => this.onBtRemove(index)}>
                    {" "}
                    CANCEL
                  </button>{" "}
                </td>
              </tr>
            </tbody>
          </Table>
        );
      }
    });
  }
}
const mapStateToProps = ({ authReducers }) => {
  return {
    id: authReducers.id,
  };
};

export default connect(mapStateToProps)(HistoryPage);
