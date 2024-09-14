"use client";

import { ThreadProps } from "@/types";

import { Heart } from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface FavoriteButtonProps {
  thread: ThreadProps;
}

export function FavoriteButton({ thread }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritedThreads = JSON.parse(
      localStorage.getItem("favoritedThreads") || "[]"
    ) as ThreadProps[];
    setIsFavorite(favoritedThreads.some((t) => t.id === thread.id));
  }, [thread.id]);

  const handleFavorite = useCallback(() => {
    const favoritedThreads = JSON.parse(
      localStorage.getItem("favoritedThreads") || "[]"
    ) as ThreadProps[];

    let newFavoritedThreads: ThreadProps[];
    if (isFavorite) {
      newFavoritedThreads = favoritedThreads.filter((t) => t.id !== thread.id);
    } else {
      newFavoritedThreads = [...favoritedThreads, thread];
    }

    localStorage.setItem(
      "favoritedThreads",
      JSON.stringify(newFavoritedThreads)
    );
    setIsFavorite(!isFavorite);
  }, [isFavorite, thread]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            className="dark:text-zinc-300 text-zinc-500"
            onClick={handleFavorite}
          >
            <Heart className={isFavorite ? "fill-red-500" : ""} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isFavorite ? "Remover dos favoritos" : "Favoritar"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
