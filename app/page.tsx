"use client";

import { ThreadsSection } from "@/components/threads-section";

import { ThreadProps } from "@/types";

import { useQuery } from "@tanstack/react-query";

import { Clock } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function HomePage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["recent-threads-limited"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/thread/recents?limit=6`);
      return response.json();
    },
  });

  if (error) {
    return <div>Erro ao carregar threads.</div>;
  }

  if (isPending) {
    return <div>Carregando...</div>;
  }

  return (
    <main>
      <div className="my-5">
        <h1 className="text-3xl lg:text-5xl font-bold text-zinc-700 dark:text-zinc-50">
          Olá
        </h1>
        <h2 className="text-xl lg:text-3xl text-zinc-600 dark:text-zinc-200">
          Bem-vindo ao <span className="text-[#6FB1FF]">desenrola.me</span>
        </h2>
        <p className="text-md lg:text-lg text-zinc-500 dark:text-zinc-400 mt-5">
          Me marque em uma thread no Bluesky com{" "}
          <a
            href="https://bsky.app/profile/desenrola.me"
            target="_blank"
            className="text-[#6FB1FF] underline"
          >
            @desenrola.me
          </a>{" "}
          que eu vou enviar uma página personalizada para você.
        </p>
      </div>
      <ThreadsSection
        threads={data as ThreadProps[]}
        title={
          <>
            <Clock className="w-5" />
            Recentes
          </>
        }
        description="Threads criadas recentemente."
        href="/recentes"
      />
    </main>
  );
}
