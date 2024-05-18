import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { transformationTypes } from "@/constants";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);
  const transformation = image ? transformationTypes[image.transformationType as TransformationTypeKey] : null;

  return (
    <>
      <Header title={image.title} />

      <section className="mt-2 flex flex-wrap gap-4">
        <div className="p-14-medium flex gap-2">
          <p className="text-dark-600">Transformação:</p>
          <p className="flex gap-2 text-purple-500 opacity-80 whitespace-nowrap">
            {transformation && (
              <Image
                src={`/assets/icons/${transformation.icon}`}
                alt={transformation.title}
                width={14}
                height={14}
                className="iconPurple"
              />
            )}

            {transformation?.transformedLabel}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-500">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium flex gap-2">
              <p className="text-dark-600">Cor:</p>
              <p className=" capitalize text-purple-500">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium flex gap-2">
              <p className="text-dark-600">Dimensão de tela:</p>
              <p className=" capitalize text-purple-500">{image.aspectRatio}</p>
            </div>
          </>
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

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;