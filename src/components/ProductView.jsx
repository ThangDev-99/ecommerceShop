import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/shopping-cart/cartItemSlide'
import Button from './Button'
import { withRouter } from 'react-router'
import numberWithCommas from '../ultis/numberWithCommas'


const ProductView = props => {

    const dispatch = useDispatch()

    let product = props.product

    if(product === undefined) {
        product = {
            price: 0,
            title: '',
            color: [],
            size: []
    }}

    // State
    const [previewImg, setPreviewImg] = useState(product.image01)
    const [descExpand, setDescExpand] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setPreviewImg(product.image01)
        setQuantity(1)
        setColor(undefined)
        setSize(undefined)
    }, [product])

    const check = () => {
        if(color === undefined){
            alert("Vui lòng chọn màu sắc")
            return false;
        }
        if(size === undefined) {
            alert("Vui lòng chọn kích cỡ")
            return false;
        }
        return true;
    }
    // Action
    const addToCart = () => {
        if(check()){
            dispatch(addItem({
                slug: product.slug,
                color,
                size,
                quantity,
                price: product.price
            }))
            
        }
    }
    const goToCart = () => {
        if(check()) {
            dispatch(addItem({
                slug: product.slug,
                color,
                size,
                quantity,
                price: product.price
            }))
            props.history.push('/cart')
        }

    }

    // Render UI
    return (
        <div className='product'>
            <div className="product__images">
                <div className="product__images__list">
                    <div 
                        className="product__images__list__item" 
                        onClick={() => setPreviewImg(product.image01)}
                    >
                        <img src={product.image01} alt="" />
                    </div>
                    <div 
                        className="product__images__list__item"
                        onClick={() => setPreviewImg(product.image02)}
                    >
                        <img src={product.image02} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div 
                    className={`product-description ${descExpand ? "expand" : ''} `}
                >
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div 
                        className="product-description__content"
                        dangerouslySetInnerHTML={{__html:product.description}}
                    >
                    </div>

                    <div className="product-description__toggle">
                        <Button 
                            size="sm" 
                            onClick={() => setDescExpand(!descExpand)}
                        >
                        {
                            descExpand ? (<i className='bx bxs-chevron-up'></i>) : (<i className='bx bxs-chevron-down'></i>)
                        }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">
                    {product.title}
                </h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {product.colors?.map((item, index) => (
                            <div 
                                key={index}
                                className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                                onClick={() => setColor(item)}
                            >
                                <div className={`circle bg-${item}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {product.size.map((item, index) => (
                            <div 
                                key={index}
                                className={`product__info__item__list__item ${size === item ? 'active' : ''}`}
                                onClick={() => setSize(item)}
                            >
                                <span className="product__info__item__list__item__size">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div 
                            className="product__info__item__quantity__btn"
                            onClick={() => quantity > 1 ? setQuantity(quantity - 1) : 1}
                        >
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div 
                            className="product__info__item__quantity__btn"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button size="sm" onClick={() =>addToCart()}>Thêm vào giỏ hàng</Button>
                    <Button size="sm" onClick={()=>goToCart()}>Mua ngay</Button>
                </div>
            </div>
            <div 
                    className={`product-description mobile ${descExpand ? "expand" : ''} `}
                >
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div 
                        className="product-description__content"
                        dangerouslySetInnerHTML={{__html:product.description}}
                    >
                    </div>

                    <div className="product-description__toggle">
                        <Button 
                            size="sm" 
                            onClick={() => setDescExpand(!descExpand)}
                        >
                        {
                            descExpand ? (<i className='bx bxs-chevron-up'></i>) : (<i className='bx bxs-chevron-down'></i>)
                        }
                        </Button>
                    </div>
                </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)