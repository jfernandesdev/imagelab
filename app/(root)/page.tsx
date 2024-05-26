import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import Image from "next/image"

import { getUserById } from "@/lib/actions/user.actions";

import { Collection } from "@/components/shared/Collection"
import { getUserImages } from "@/lib/actions/image.actions";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();
  
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user?._id });

  return (
    <> 
      <section className="home">
        <h1 className="home-heading">
          Simplifique suas edições <br /> com
          <span> ImageLab
            <Image
              src="/assets/icons/shine.svg"
              alt="ImageLab"
              height={24}
              width={24}
            />
          </span>
        </h1>

        <Image
          src="/assets/images/girl-image-banner.svg"
          alt="Garota com seu gato editando imagens"
          height={350}
          width={350}
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