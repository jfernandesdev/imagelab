"use client"

import React from "react"
import Image from "next/image"
import { CldImage, getCldImageUrl } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils"

const TransformedImage = (
  { 
    image, 
    type, 
    title,
    isTransforming, 
    setIsTransforming, 
    transformationConfig,
    hasDownload = false,
    displayTitle = false
  }: TransformedImageProps) => {
    
  const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  }

  return (
    <div>
      <div className="flex-between items-center">

        {displayTitle && (<h3 className="p-18-semibold text-dark-600 mb-4">Transformada:</h3>)}

        {hasDownload && (
          <button className="download-btn" onClick={handleDownload}>
            <span>Download</span>
            <Image 
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            src={image?.publicId}
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            alt={image.title}
            sizes={"(max-width:767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image 
                src="/assets/icons/spinner.svg"
                alt="Transformando..."
                width={48}
                height={48}
              />
            </div>
          )}
        </div>
      ): (
        <div className="transformed-placeholder">
          Imagem transformada
        </div>
      )}
    </div>
  )
}

export default TransformedImage