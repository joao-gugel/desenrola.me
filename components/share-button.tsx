"use client";

import { Share } from "lucide-react";

import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  id: string;
}

export function ShareButton({ id }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = () => {
    toast({
      className: "bg-[#fff] dark:bg-black text-zinc-600 dark:text-zinc-300",
      title: "Link copiado!",
      description: `Link da thread copiado para a área de transferência.`,
    });

    navigator.clipboard.writeText(
      `👀 Olhe essa thread incrível que encontrei no Desenrola.me:\n${window.location.origin}/thread/${id}`
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            className="dark:text-zinc-300 text-zinc-500"
            variant={"outline"}
            size="icon"
            onClick={handleShare}
          >
            <Share />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Compartilhar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
