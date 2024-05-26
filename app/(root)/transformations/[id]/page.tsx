import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { getImageById } from "@/lib/actions/image.actions";

import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

import { getImageSize } from "@/lib/utils";
import { transformationTypes } from "@/constants";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);
  const transformation = image ? transformationTypes[image.transformationType as TransformationTypeKey] : null;

  return (
    <>
      <Header title={image.title} />

      <section className="flex justify-between flex-col md:flex-row items-start md:items-center gap-2">
        <div className="flex flex-wrap gap-4">
          <div className="p-14-medium flex gap-2 items-center">
            <p className="flex gap-2 text-purple-500 whitespace-nowrap">
              {transformation && (
                <Image
                  src={`/assets/icons/${transformation.icon}`}
                  alt="ícone do tipo da transformação"
                  width={14}
                  height={14}
                  className="iconPurple"
                />
              )}

              {transformation?.transformedLabel}
            </p>
          </div>

          {image.color && (
            <>
              <p className="text-dark-400/50">&#x25CF;</p>
              <div className="p-14-medium flex items-center gap-2">
                <p className=" capitalize text-purple-500">{image.color}</p>
              </div>
            </>
          )}

          {image.aspectRatio && (
            <>
              <p className="text-dark-400/50">&#x25CF;</p>
              <div className="p-14-medium flex items-center gap-2">
                <p className=" capitalize text-purple-500">{image.aspectRatio}</p>
              </div>
            </>
          )}
        </div>

        {userId === image.author.clerkId && (
          <div className="flex gap-2 w-full md:w-auto justify-end ">
            <Button asChild type="button" className="edit-button">
              <Link href={`/transformations/${image._id}/update`}>
                <Image
                  src={`/assets/icons/pencil-edit.svg`}
                  alt="Editar"
                  width={24}
                  height={24}
                />
                <span className={`tooltip tooltip-top`}>
                  Editar
                  <span className="tooltip-pointer"></span>
                </span>
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>


      <section className="mt-5 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/* Imagem original */}
          <div className="flex flex-col gap-4">
            <h3 className="p-18-semibold text-dark-600">Original:</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* Imagem transformada */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
            displayTitle
          />
        </div>
      </section>
    </>
  );
};

export default ImageDetails;