"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateCredits } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast"

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

export const InsufficientCreditsModal = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCredits = async () => {
    try {
      startTransition(async () => {
        await updateCredits(userId, 5);
      });
  
      toast({
        title: "Sucesso!",
        description: "Você ganhou +5 créditos gratuitos.",
  
        duration: 5000,
        className: "success-toast"
      });
  
      router.push('/credit');
    } catch (error) {
      toast({
        title: "Ops! Crédito não adicionado.",
        description: "Por favor, tente novamente.",

        duration: 5000,
        className: "error-toast"
      });

      console.error(error);
    }
  }

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex-between">
            <p className="p-16-semibold text-dark-400">Crédito Insuficiente 🫤</p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push("/credit")}
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
            Ops... Parece que seus créditos gratuitos se esgotaram!
          </AlertDialogTitle>

          <AlertDialogDescription className="p-16-regular py-3">
            Não se preocupe, você pode continuar aproveitando nossos serviços ganhando mais créditos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="button w-full bg-purple-100 text-dark-400"
            onClick={() => router.push("/credit")}
          >
           Não, obrigado
          </AlertDialogCancel>
          <AlertDialogAction
            className="button w-full bg-purple-gradient bg-cover"
            onClick={handleAddCredits}
          >
            Ver anúncio
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};