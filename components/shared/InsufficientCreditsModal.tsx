"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const InsufficientCreditsModal = () => {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex-between">
            <p className="p-16-semibold text-dark-400">Crédito Insuficiente 🫤</p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push("/profile")}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="credit coins"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>

          <Image
            src="/assets/images/insufficient-credits.svg"
            alt="credit coins"
            width={462}
            height={122}
          />

          <AlertDialogTitle className="p-24-bold text-dark-600">
            Ops... Parece que seus créditos mensais gratuitos se esgotaram!
          </AlertDialogTitle>

          <AlertDialogDescription className="p-16-regular py-3">
            Não se preocupe, você pode continuar aproveitando nossos serviços ganhando mais créditos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="button w-full bg-purple-100 text-dark-400"
            onClick={() => router.push("/profile")}
          >
           Não, obrigado
          </AlertDialogCancel>
          <AlertDialogAction
            className="button w-full bg-purple-gradient  bg-cover"
            onClick={() => router.push("/profile")}
          >
            Ver anúncio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};