import { Container } from "@/components/Container/Container";
import clsx from "clsx";

export function GridLines() {
  return (
    <div className="absolute inset-0">
      <Container className="h-full">
        <div className="relative h-full">
          <div className="grid grid-cols-4 md:grid-cols-12 h-full">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className={clsx("border-r border-dashed border-dark-900/20", {
                  "border-l": idx === 0,
                  "hidden md:block": idx >= 4,
                })}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
