"use client";

import { ThreadsSection } from "@/components/threads-section";

import { ThreadProps } from "@/types";

import { useQuery } from "@tanstack/react-query";

import { Clock } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function RecentsPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["recent-threads"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/thread/recents?limit=30`);
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
      <ThreadsSection
        threads={data as ThreadProps[]}
        title={
          <>
            <Clock className="w-5" />
            Recentes
          </>
        }
        description="Acompanhe as threads criadas recentemente."
      />
    </main>
  );
}
