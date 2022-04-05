import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import productData from '../assets/fake-data/products'
import Helmet from '../components/Helmet'
import numberWithCommas from '../ultis/numberWithCommas'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'

const Cart = () => {
  const cartItems = useSelector(state => state.cartItems.value)

  const [cartProducts, setCartProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems))
    setTotalProducts(cartItems.reduce((total, item)=> total + Number(item.quantity),0))
    setTotalPrice(cartItems.reduce((total,item) => total + (Number(item.quantity) * Number(item.price)) , 0))
  }, [cartItems])

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
        <div className="cart__info__txt">
          <p>
            Bạn dan có {totalProducts} sản phẩm trong giỏ hàng
          </p>
          <div className="cart__info__txt__price">
            <span>Thành tiền: </span>
            <span>{numberWithCommas(totalPrice)} VNĐ</span>
          </div>
          <div className="cart__info__btn">
            <Button size="block" onClick={() => {}}>Đặt hàng</Button>
            <Link to="/catalog">
              <Button size="block" >
                Tiếp tục đặt hàng
              </Button>
            </Link>
         </div>
        </div>
         
        </div>
        <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index}/>
          )
          )}
        </div>
      </div>
    </Helmet>
  )
}

export default Cart