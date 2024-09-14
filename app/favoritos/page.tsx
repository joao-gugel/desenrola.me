"use client";

import { useEffect, useState } from "react";
import { ThreadsSection } from "@/components/threads-section";
import { ThreadProps } from "@/types";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const [parsedThreads, setParsedThreads] = useState<ThreadProps[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const threadsStorage = localStorage.getItem("favoritedThreads");
      if (threadsStorage) {
        setParsedThreads(JSON.parse(threadsStorage) as ThreadProps[]);
      }
    }
  }, []);

  return (
    <main>
      <ThreadsSection
        threads={parsedThreads}
        title={
          <>
            <Heart className="w-5" />
            Favoritos
          </>
        }
        description="Threads favoritadas por você."
      />
    </main>
  );
}
