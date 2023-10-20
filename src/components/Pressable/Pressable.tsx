import clsx from "clsx";
import { forwardRef as forwardRefOriginal } from "react";

export interface PressableProps {
  disabled?: boolean;
}

type Props<E extends keyof JSX.IntrinsicElements> = PressableProps &
  JSX.IntrinsicElements[E] & {
    as: E;
  };

// Redeclaring!! Whaaaaat?
// thankfully, these declarations are module scoped
// so it won't overwrite others.
// We need forwardRef to be generic as well as PressableRef being generic.
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module "react" {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

function PressableRef<E extends keyof JSX.IntrinsicElements>(
  { as, className, disabled, children, ...props }: Props<E>,
  ref: React.ForwardedRef<unknown>
) {
  // for some reason TS complains when we use E here
  const Tag = as as React.ElementType;

  const isDisabled = disabled;

  return (
    <Tag
      {...props}
      onClick={props.onClick}
      disabled={isDisabled}
      className={clsx("inline-block relative cursor-pointer", className)}
      ref={ref}
    >
      <span className="h-full w-full top-0 left-0 border-2 rounded bg-secondary-900 absolute transform translate-y-shadow-offset" />
      <span
        className={clsx(
          "font-semibold p-6px border-2 rounded border-dark-900 inline-block relative bg-light-900 transform transition",
          "hover:-translate-y-shadow-offset",
          "active:translate-y-shadow-offset"
        )}
      >
        {children}
      </span>
    </Tag>
  );
}

export const Pressable = forwardRefOriginal(PressableRef);
