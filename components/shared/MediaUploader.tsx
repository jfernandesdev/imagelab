"use client";

import React from "react";
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

interface IMediaUpload {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: any; 
  publicId: string; 
  type: string;
}

const MediaUploader = ({ onValueChange, setImage, image, publicId, type }: IMediaUpload) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Upload feito com sucesso",
      description: "1 crédito usado",
      
      duration: 5000,
      className: "success-toast"
    });
  }

  const onUploadErrorHandler = () => {
    toast({
      title: "Erro durante o upload da imagem",
      description: "Por favor, tente novamente.",
      duration: 5000,
      className: "error-toast"
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="imagelab_upload"
      options={{
        multiple: false,
        resourceType: "image"
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            {publicId ? (
              <>
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                  <CldImage 
                    src={publicId}
                    width={getImageSize(type, image, "width")}
                    height={getImageSize(type, image, "height")}
                    alt="Imagem Upload"
                    sizes={"(max-width:767px) 100vw, 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="media-uploader_cldImage" 
                  />
                </div>
              </>
            ): (
              <div className="media-uploader_cta" onClick={() => open()}>
                <div className="media-uploader_cta-image">
                  <Image 
                    src="/assets/icons/plus.svg"
                    alt="Adicionar Imagem"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="p-14-medium">Clique aqui para upload da imagem</p>
              </div>
            )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader