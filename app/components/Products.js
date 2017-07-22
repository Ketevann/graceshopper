import React from 'react'
import { Link } from 'react-router'
import {addFilter, removeFilter} from '../reducers/filter'
import {deleteProduct} from '../reducers/products'
import store from '../store'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

  clickHandler = (evt) =>{
    // if(this.props.filtered.indexOf(evt.target.value)===-1||this.props.filtered.length===8)
    //   store.dispatch(addFilter(evt.target.value))
    // else store.dispatch(removeFilter(evt.target.value))
  }

  handleClick = (id, action) =>{
    console.log("here")
    if (action === 'delete')
    this.props.deleteProduct(id)
    else this.props.somefunc
  }
  render() {
    const divStyle = {
      width: 250,
      height: 230
    }

    // let products = this.props.products.filter((prod)=> this.props.filtered.indexOf(prod.categories)!==-1)


    console.log(this.props.products, 'PROPS',this.props)
    return (
      <div className="container products">
        <div >
          <div >

          </div>
          <div >
          <h1 className="header">Products</h1>
          {this.props.auth && this.props.auth.role==='admin' ?
          <h1>
                 <Link to='/add'><button className="add btn btn-default" >Add Products</button></Link></h1> :null}
          {
            this.props.products && this.props.products.map((product) => {
              return (
                <div key={product.id} className="col-sm-2">
                <Link to={`/products/${product.id}`}>


                <img id="prodimg"  src={product.img} />
                  <p className="productinfo">{product.name} $ {product.price}</p>
               </Link>
                {this.props.auth && this.props.auth.role==='admin' ?
                <button className="rmedit btn btn-default" onClick={() => this.handleClick(product.id, 'delete')}>Remove</button> :null}
                   {this.props.auth && this.props.auth.role==='admin' ?
                 <Link  to={`/update/${product.id}`}><button className="btn btn-default" >Edit</button></Link> :null}

                </div>
                )
            })
          }
      </div>
      </div>
      </div>

    )
  }
}

import {connect} from 'react-redux'

export default connect(
  state => ({products: state.products,
          filtered: state.filter, auth: state.auth}),
  {addFilter, removeFilter, deleteProduct},
)(Products)
