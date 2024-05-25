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

export const ConstructionModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>

          <div className="flex justify-end">
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push("/")}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="fechar"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>

          <div className="flex justify-center">
            <Image
              src="/assets/images/man-with-coffee.svg"
              alt="credit coins"
              width={362}
              height={122}
            />
          </div>

          <AlertDialogTitle className="p-24-bold text-dark-600">
            Em desenvolvimento...
          </AlertDialogTitle>

          <AlertDialogDescription className="p-16-regular py-3">
            Só um instante, estou preparando um café antes de seguir em frente.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};