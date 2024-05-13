import { Collection } from "@/components/shared/Collection"
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Simplifique suas edições <br /> com
          <span> ImageLab
            <Image
              src="/assets/icons/shine.svg"
              alt="ImageLab"
              height="24"
              width="24"
            />
          </span>
        </h1>

        <Image
          src="/assets/images/girl-image-banner.svg"
          alt="ImageLab"
          height="400"
          width="400"
        />
      </section>

      <section className="sm:mt-12 pb-6">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home