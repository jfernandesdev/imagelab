"use client";

import { useTransition } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteImage } from "@/lib/actions/image.actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-full">
        <Button
          type="button"
          className="remove-button"
          variant="destructive"
        >
          <Image
            src={`/assets/icons/trash.svg`}
            alt="Remover"
            width={24}
            height={24}
          />
          <span className={`tooltip tooltip-top`}>
            Remover
            <span className="tooltip-pointer"></span>
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10">
        <AlertDialogHeader>
          <div className="flex justify-center py-2">
            <Image
              src={`/assets/icons/trash.svg`}
              alt="Remover"
              width={100}
              height={100}
            />
          </div>

          <AlertDialogTitle>
            Tem certeza de que deseja apagar esta imagem?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            Esta ação excluirá a imagem permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="border bg-red-500 text-white hover:bg-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? "Excluindo..." : "Sim, excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};