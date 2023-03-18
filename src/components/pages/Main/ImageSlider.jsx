import React, { useState, useEffect, useRef } from 'react'
import RightArrow from '../../../assets/mainPage/RightArrow.svg'
import LeftArrow from '../../../assets/mainPage/LeftArrow.svg'
import Image_1 from '../../../assets/mainPage/Image_1.svg'
import Image_2 from '../../../assets/mainPage/Image_2.svg'
import Image_3 from '../../../assets/mainPage/Image_3.svg'
import Image_4 from '../../../assets/mainPage/Image_4.svg'
import Image_5 from '../../../assets/mainPage/Image_5.svg'
import './Dot.css'
import { FaCircle } from 'react-icons/fa'
/*       css       */
import './Dot.css'

const ImageSlider = () => {
  const images = [
    { url: Image_1 },
    { url: Image_2 },
    { url: Image_3 },
    { url: Image_4 },
    { url: Image_5 }
  ]

  const [currentIndex, setCurrtentIndex] = useState(0)
  const timerRef = useRef(null)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrtentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newSlide = isLastSlide ? 0 : currentIndex + 1
    setCurrtentIndex(newSlide)
  }

  const goToSlide = (slideIndex) => {
    setCurrtentIndex(slideIndex)
  }

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      nextSlide()
    }, 3000)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [nextSlide])

  return (
    <div className="flex">
      <div className="w-full mx-36 py-10 relative flex justify-center">
        <img className="w-full rounded-2xl" src={images[currentIndex].url} alt="" />
        {/* Left Arrow */}
        <div
          onClick={prevSlide}
          className="h-[44px] w-[44px] flex justify-center items-center bg-[#f5f5f581] hover:opacity-60 rounded-full absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl p-2 cursor-pointer mx-5"
        >
          <img src={LeftArrow} />
        </div>
        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className="h-[44px] w-[44px] flex justify-center items-center bg-[#f5f5f581] hover:opacity-60 rounded-full absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl p-2 cursor-pointer mx-5"
        >
          <img src={RightArrow} />
        </div>
        <div className="absolute flex bottom-[10%] right-[45%]" dir="ltr">
          {images.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={currentIndex === slideIndex ? 'dot active' : 'dot'}
            >
              <FaCircle />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
