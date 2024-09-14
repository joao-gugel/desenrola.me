import Image from "next/image";

import { Button } from "./ui/button";

import { ThreadProps } from "@/types";

import Link from "next/link";

import { FavoriteButton } from "./favorite-button";

import Avatar from "@/app/assets/avatar.png";

interface ThreadCardProps {
  thread: ThreadProps;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  function getThreadContent(content?: string) {
    if (!content) return "Conteúdo não disponível.";

    const contentArray = JSON.parse(content);

    const lastContentText = contentArray[contentArray.length - 1].text;

    return lastContentText;
  }

  function getThreadPostsQuantity(content?: string) {
    if (!content) return 0;

    const contentArray = JSON.parse(content);

    return contentArray.length;
  }

  return (
    <div className="border px-4 py-4 rounded-md space-y-5 text-zinc-600 dark:text-zinc-300 hover:shadow-sm dark:shadow-zinc-800 flex flex-col justify-between">
      <div className="flex gap-3 items-center">
        <Image
          src={thread.author?.avatar || Avatar}
          alt={`Foto de perfil de ${thread.author?.name}`}
          width={50}
          height={50}
          className="rounded-full object-cover w-12 h-12"
        />
        <div>
          <p className="text-zinc-600 font-medium dark:text-zinc-200">
            {thread.author?.name || "Erro ao carregar nome do autor"}
          </p>
          <span>{thread.author?.handle || "Handle não encontrado"}</span>
        </div>
      </div>
      <div className="h-36 text-left overflow-hidden">
        <p>{getThreadContent(thread.content)}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button variant={"outline"}>
          <Link href={`/thread/${thread.id}`}>
            Ler {getThreadPostsQuantity(thread.content)} posts
          </Link>
        </Button>
        <FavoriteButton thread={thread} />
      </div>
    </div>
  );
}
