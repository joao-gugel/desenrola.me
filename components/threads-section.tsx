import { ThreadProps } from "@/types";

import { ThreadCard } from "./thread-card";

import Link from "next/link";
import { Frown } from "lucide-react";
import { Button } from "./ui/button";

interface ThreadsSectionProps {
  threads: ThreadProps[];
  title: JSX.Element | string;
  description: string;
  href?: string;
}

export function ThreadsSection({
  threads,
  title,
  description,
  href,
}: ThreadsSectionProps) {
  return (
    <div className="my-5">
      <div className="mb-5">
        <h2 className="text-zinc-600 dark:text-zinc-200 text-lg font-medium underline flex items-center gap-2">
          {href ? (
            <Link href={href} className="flex items-center gap-2">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <h3 className="text-zinc-600 dark:text-zinc-300 text-md">
          {description}
        </h3>
      </div>
      {threads.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
          {href && (
            <div className="mt-5">
              <Button size="lg" className="dark:text-zinc-200">
                <Link href={href}>Ver mais</Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="h-96 w-full flex flex-col items-center justify-center gap-5 text-zinc-600 dark:text-zinc-500">
          <Frown className="w-20 h-20" />
          <h1 className="text-xl">Nenhuma thread foi encontrada</h1>
        </div>
      )}
    </div>
  );
}
