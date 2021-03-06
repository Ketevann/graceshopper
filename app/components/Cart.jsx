import React from 'react'
import { Link } from 'react-router'
import { checkOut, removeProduct, updateProduct } from '../reducers/cartItems'
import { connect } from 'react-redux'
import { Popover } from 'react-bootstrap';


const total = (items) => {
  let totalNumber = items.map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b).toFixed(2)

    return totalNumber
}
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  handleCheckout = function (evt) {
    evt.preventDefault()
    const { id } = this.props.user
    // if user is logged in, checks out
    if (id) this.props.checkOut(id, this.props.cart.items)
    else this.setState({ clicked: true })
  }
  //removes items from cart
  handleRemove(item) {
    this.props.removeProduct(item.product_id, item.order_id)
  }

  //updates products
  onUpdate = function (evt, item) {
    evt.preventDefault()
    let quantity = evt.target.quantity.value
    this.props.updateProduct(evt.target.quantity.value, item.product_id, item.order_id)
  }
  componentWillMount() {
    if (this.props.user && this.props.user.userId) {
      this.setState({ clicked: false })
    }
  }
  render() {
    let cartItems = this.props.cart
    let user = this.props.user
    return (
      <div className="container cart">
        <div className="row">
          <div className="col-md-9">
            <h1 className="header">Your Cart:</h1>
            <table className="table">
              <thead className="thead-inverse thead">
                <tr className="tr">
                  <th className="th text-center ">Item Number</th>
                  <th className="th text-center ">Name</th>
                  <th className="th text-center ">Price</th>
                  <th className="th text-center ">Quantity</th>
                  <th className="th text-center ">Total Per Item</th>
                  <th className="th text-center ">Update</th>
                  <th className="th text-center ">Item</th>
                </tr>
              </thead>
              {
                this.props.cart.items ? cartItems.items.map((item, index) => {
                  var image = ""
                  image = item.product.img
                  let totalprice = (item.price * item.quantity).toFixed(2)
                  return (
                    <tbody
                      className="tbody"
                      key={item.id}
                    >
                      <tr className="tr">
                        <td className="td">{index + 1}</td>
                        <td className="td"> {item.product.name} </td>
                        <td className="td"> {item.product.price} </td>
                        <td className="td"> {item.quantity} </td>
                        <td className="td">{totalprice}</td>

                        <td className="td">
                          <form className="updateform" action="" onSubmit={(evt) => this.onUpdate(evt, item)}>
                            <input className="updateinput cartupdate" name="quantity" type="text" />
                            <input className="btn btn-default updatebtn" type="text" type='submit' value="Update" />

                          </form>
                          <div className="removebtn">
                            <div onClick={() => this.handleRemove(item)}>Remove </div>
                          </div>
                        </td>
                        <td className="td"> <img id="cartproducts" src={image} /></td>
                      </tr>
                    </tbody>
                  )
                })
                  : null}
            </table>
          </div>
          <div className="col-md-3">
            {/* calculate the total items in a cart  */}
            <h1 id="total">Total: ${
              this.props.cart.items && this.props.cart.items.length > 0 ?
                total(this.props.cart.items)
                : null} </h1>
            <form onSubmit={this.handleCheckout}>
              <button className="btn btn-default" type="submit"> check out</button>
            </form>

          </div>
        </div>
        {/* Popup for login/sign up  */}
        {this.state.clicked && !this.props.user.userId ?
          <div className="popover" style={{ height: 120 }}>
            <Popover
              id="popover-basic"
              placement="right"
              positionLeft={500}
              positionTop={50}
              title="Checkout"
            >
              Please  <Link to="/login"><strong>login</strong></Link> or <Link to="/signup"> <strong>sign up</strong></Link>.
  </Popover>
          </div> : null}
      </div>

    )
  }
}



export default connect(
  state => ({ cart: state.cartItems, user: state.auth }),
  { checkOut, removeProduct, updateProduct },
)(Cart)


