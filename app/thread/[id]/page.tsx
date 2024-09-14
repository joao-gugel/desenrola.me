"use client";

import { FavoriteButton } from "@/components/favorite-button";
import { ShareButton } from "@/components/share-button";
import { Separator } from "@/components/ui/separator";

import { ThreadProps, ThreadSectionProps } from "@/types";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

import Avatar from "@/app/assets/avatar.png";

interface ThreadPageProps {
  params: {
    id: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ThreadPage({ params }: ThreadPageProps) {
  const { data, error, isPending } = useQuery({
    queryKey: ["thread", params.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/thread/${params.id}`);
      return response.json() as Promise<ThreadProps>;
    },
  });

  if (error) {
    return <div>Erro ao carregar thread.</div>;
  }

  if (isPending) {
    return <div>Carregando...</div>;
  }

  return (
    <main>
      <div className="flex my-5 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image
            src={data.author?.avatar || Avatar}
            alt={`Foto de perfil de ${data.author?.name}`}
            width={100}
            height={100}
            className="rounded-full object-cover w-14 h-14 lg:w-16 lg:h-16"
          />
          <div>
            <p className="text-zinc-600 font-medium dark:text-zinc-200 lg:text-xl">
              {data.author?.name || "Erro ao carregar nome do autor"}
            </p>
            <span className="dark:text-zinc-300 text-zinc-700 lg:text-lg underline">
              <a
                href={`https://bsky.app/profile/${data.author?.handle}`}
                target="_blank"
              >
                {data.author?.handle || "Handle não encontrado"}
              </a>
            </span>
          </div>
        </div>
        <div className="space-x-2">
          <ShareButton id={params.id} />
          <FavoriteButton thread={data} />
        </div>
      </div>
      <Separator className="mb-5" />
      <div className="text-zinc-600 dark:text-zinc-300">
        {JSON.parse(data.content || "")
          .reverse()
          .map((section: ThreadSectionProps, i: number) => (
            <div key={i}>
              <p className="text-lg text-left my-5">{section.text}</p>
              <div className="flex flex-wrap justify-center gap-5">
                {section.images.map((image, i) => (
                  <a href={image} key={i} target="_blank">
                    <Image
                      src={image}
                      alt={`Imagem ${i}`}
                      width={1920}
                      height={1080}
                      className="rounded-md w-full h-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
