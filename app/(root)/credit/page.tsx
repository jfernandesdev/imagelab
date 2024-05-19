import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";

const Credit = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Meus créditos" />

      <section className="profile">
        <div className="profile-balance flex items-center gap-6 relative">
          <Image
            src="/assets/icons/pig-credit.svg"
            alt="créditos"
            width={75}
            height={75}
          />
          <div className="flex flex-col gap-2">
            <p className="p-14-medium md:p-16-medium">Créditos disponíveis</p>
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>

          <button className="add-credit-btn" disabled title="Indisponível no momento">
            <Image
              src="/assets/icons/coins.svg"
              alt="Adicionar crédito"
              width={24}
              height={24}
            />
            <span>Adicionar crédito</span>
          </button>
        </div>

        <div className="profile-image-manipulation flex items-center gap-6">
          <Image
            src="/assets/icons/photo.svg"
            alt="imagens transformadas"
            width={75}
            height={75}
          />
          <div className="flex flex-col gap-2">
            <p className="p-14-medium md:p-16-medium">Imagens transformadas</p>
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Credit;