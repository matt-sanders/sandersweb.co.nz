import { Container } from "@/components/Container/Container";
import clsx from "clsx";

export function GridLines() {
  return (
    <div className="absolute inset-0">
      <Container className="h-full">
        <div className="relative h-full">
          <div className="grid grid-cols-4 md:grid-cols-12 h-full gap-24px border-dashed border-l border-r border-dark-900/20">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className={clsx("relative", {
                  "hidden md:block": idx >= 4,
                })}
              >
                {idx > 0 && (
                  <div className="absolute top-0 bottom-0 right-full border-l transform -translate-x-12px border-dashed border-dark-900/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
