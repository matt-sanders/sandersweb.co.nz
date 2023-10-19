import { Container } from "@/components/Container/Container";
import clsx from "clsx";

export function GridLines() {
  return (
    <Container>
      <div className="grid grid-cols-4 md:grid-cols-12 absolute w-full h-full">
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
    </Container>
  );
}
