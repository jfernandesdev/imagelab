"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative w-full">
      <div className="collection-heading">
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-16-regular">Nenhuma imagem para exibir</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="pagination-content">
            <Button
              className="collection-btn"
              disabled={Number(page) <= 1}
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious
                title="Anterior"
                className="hover:bg-transparent hover:text-white" 
              />
            </Button>

            <p className="flex-center p-16-medium w-full flex-1 md:hidden">
              {page} / {totalPages}
            </p>

            <Button
              className="collection-btn"
              disabled={Number(page) >= totalPages}
              onClick={() => onPageChange("next")}
            >
              <PaginationNext 
                title="Próxima"
                className="hover:bg-transparent hover:text-white" 
              />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link 
        href={`/transformations/${image._id}`} 
        className="collection-card" 
        title={`${image.title}`}
        >
        <CldImage
          src={image.publicId}
          alt={image?.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-64 w-full rounded-[10px] object-cover object-left-center"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div 
          className="collection-icon-type" 
          title={`${transformationTypes[image.transformationType as TransformationTypeKey].title}`}
          >
          <Image
            src={`/assets/icons/${transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
              }`}
            alt="Imagem original"
            width={18}
            height={18}
          />
        </div>
      </Link>
    </li>
  );
};