import clsx from "clsx";

export function GridLines() {
  return (
    <div className="max-w-screen-xl grid grid-cols-4 md:grid-cols-12 absolute w-full h-full px-site-gutter">
      {[...Array(12)].map((_, idx) => (
        <div
          key={idx}
          className={clsx("border-r border-dashed", {
            "border-l": idx === 0,
            "hidden md:block": idx >= 4,
          })}
        />
      ))}
    </div>
  );
}
