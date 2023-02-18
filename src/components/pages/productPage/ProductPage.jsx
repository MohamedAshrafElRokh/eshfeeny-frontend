import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
/*    Components    */
import UserNavigation from '../../common/UserNavigation'
import QuantityController from '../../pages/productPage/QuantityControllerProductDetails'
import ProductDetails from './ProductDetails'
/*       Icons       */
import Arrow from '../../../assets/common/Arrow.svg'
import Alternative from '../../../assets/common/Alternative.svg'
import HeartEmpty from '../../../assets/common/HeartEmpty.svg'
import HeartFill from '../../../assets/common/HeartYellow.svg'
/*       API       */
import * as ProductsAPI from '../../../utils/productsAPI'
import * as UsersAPI from '../../../utils/usersAPI'

const ProductPage = ({ loggedInUser }) => {
  const images = []
  const [currentImage, setCurrentImage] = useState([])
  const changeImage = (e) => {
    // setCurrentImage(e.target.src)
    if (e.target.src) {
      setCurrentImage(e.target.src)
    } else {
      setCurrentImage(e.target.firstChild.src)
    }
  }

  const [showButton, setShowButton] = useState(true)
  const handleButton = () => {
    setShowButton(!showButton)
  }

  const params = useParams()
  const [product, setProduct] = useState([])
  const [favouriteProducts, setFavouriteProducts] = useState([])
  useEffect(() => {
    const getProduct = async () => {
      setProduct(await ProductsAPI.getProduct(params.id))
      setFavouriteProducts(await ProductsAPI.getFavoriteProducts(loggedInUser))
    }
    getProduct()
  }, [favouriteProducts])
  const favouriteProductsNames = favouriteProducts.map((product) => product.nameAr)
  return (
    <div>
      <UserNavigation />
      <div className="pt-8 pr-20 text-[16px] text-lightBlue">
        <div className="flex justify-start">
          <Link to="/products" className="hover:underline">
            الرئيسية
          </Link>
          <img src={Arrow} className="mx-2" />
          <Link to={`/products/type/${product.type}`} className="hover:underline">
            {product.type}
          </Link>
          <img src={Arrow} className="mx-2" />
          <Link to={`/products/category/${product.category}`} className="hover:underline">
            {product.category}
          </Link>
          <img src={Arrow} className="mx-2" />
          <p className="text-[#1F1F1F]">{product.nameAr}</p>
        </div>
      </div>
      <div className="flex justify-start pt-8 border-b h-80">
        <section className="flex flex-col overflow-auto pr-20">
          {/*      small Pictures     */}
          {images.map((image) => (
            <div
              key={image}
              className="flex justify-center items-center mb-3 w-20 border border-[#F99D1C] border-opacity-50 rounded-[10px] cursor-pointer"
              onClick={changeImage}
            >
              <img src={image} className="h-20 py-5" />
            </div>
          ))}
        </section>
        {/*     Favourites Heart     */}
        <div className="flex pr-8">
          {favouriteProductsNames.includes(product.nameAr) /*     Remove from Favourites     */ && (
            <button
              onClick={async () => await UsersAPI.removeFromFavorites(loggedInUser, params.id)}
            >
              <img src={HeartFill} />
            </button>
          )}
          {!favouriteProductsNames.includes(product.nameAr) /*     Add To Favourites     */ && (
            <button onClick={async () => await UsersAPI.addToFavorites(loggedInUser, params.id)}>
              <img src={HeartEmpty} />
            </button>
          )}
        </div>
        {/*      Big Picture         */}
        <div className="flex w-1/2 items-end">
          <div className="w-64 h-fit mb-10 mr-36">
            <img src={currentImage} />
          </div>
        </div>
        {/*     Left Section        */}
        <div className="flex flex-col text-right text-[24px] pt-10">
          <p>
            {product.nameAr}
            {product.volume ? ` | ${product.volume}` : ''}
            {product.amount ? ` | ${product.amount}` : ''}
          </p>
          <p className="text-lightBlue py-3">{product.price} جنيه</p>
          <Link
            to={`/products/alternatives/${product.activeIngredient}`}
            className="flex text-[20px] items-center mb-4"
          >
            <img src={Alternative} />
            <p className="mr-2">البديل</p>
          </Link>

          {showButton && (
            <button
              className="text-white bg-orange rounded-[10px] w-80 h-14"
              onClick={handleButton}
            >
              أضف الى العربة
            </button>
          )}
          {!showButton && (
            <QuantityController
              handleHideComponent={handleButton}
              onGetUserID={loggedInUser}
              onGetProductID={params.id}
            />
          )}
        </div>
      </div>
      <div className="text-right text-[#1F1F1F] pt-8 pr-20">
        <ProductDetails
          onGetDescription={product.description}
          onGetUseCases={product.useCases}
          onGetUsage={product.usage}
          onGetSideEffects={product.sideEffects}
        />
      </div>
    </div>
  )
}

export default ProductPage
