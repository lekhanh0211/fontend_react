import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser } from "../../services/userServices";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUser("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.users,
      });
    //  console.log("Check state user 1 >>", this.state.arrUser);
    }
   // console.log(response);
  }

  render() {
    //console.log("check render >>", this.state);
    let arrUsers = this.state.arrUser;
    return (
      <div className="text-center">
        <h3 style={{ color: "red", marginTop: "20px" }}>Quản lý người dùng</h3>
        <table>
          <thead>
            <tr>
              <th>Id </th>
              <th>Full Name </th>
              <th>Email </th>
              <th>Address </th>
              <th>Phone </th>
              <th>Gender </th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.firstName}
                      {item.lastName}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.gender}</td>
                    <td>{item.updatedAt}</td>
                    <td>
                      <button className="btn btn-success">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn btn-warning"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
