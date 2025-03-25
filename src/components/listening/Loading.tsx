import { LastfmLink } from "./LastfmLink";

export const LoadingSkeleton = ({ className = "" }) => (
  <div className={className}>
    <header className="flex items-center justify-between mb-3 w-full">
      <div className="flex items-center gap-2">
        <h2 className="m-0">Escuchando</h2>
      </div>
      <LastfmLink />
    </header>
    <div className="grid items-center grid-cols-[70px_auto] gap-3 w-full animate-loading">
      <div className="rounded aspect-square bg-stone-200 dark:bg-stone-800 w-[70px] h-[70px]"></div>
      <div className="grid gap-1.5">
        <div className="w-24 h-2 bg-stone-300 dark:bg-stone-700"></div>
        <div className="w-5 h-2 bg-stone-300 dark:bg-stone-700"></div>
        <div className="w-32 h-2 bg-stone-200 dark:bg-stone-800"></div>
      </div>
    </div>
  </div>
);
