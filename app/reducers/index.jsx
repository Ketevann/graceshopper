import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  users: require('./users').default,
  cartItems: require('./cartItems').default,
  orders: require('./orders').default,
  forgot: require('./forgot').default,
  searchNames: require('./search').default,
  reviews: require('./reviews').default,
})

export default rootReducer
