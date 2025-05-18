/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowBigRightIcon } from "lucide-react";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", // Added responsive grid
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-lg", // Ensuring each card spans 1 column
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.05),0_4px_8px_rgba(0,0,0,.1)]", // Light shadow for a softer effect
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-10px_50px_-10px_#ffffff1f_inset]", // Dark mode shadows
      className
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-4 transition-all duration-300 group-hover:-translate-y-8">
      {/* <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-80" />{" "} */}
      {/* Smaller icon */}
      <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="text-sm text-neutral-400">{description}</p>{" "}
      {/* Smaller text */}
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto bg-teal-700 text-white"
      >
        <a href={href}>
          {cta}
          <ArrowBigRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
