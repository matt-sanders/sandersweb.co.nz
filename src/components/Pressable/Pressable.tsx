import clsx from 'clsx'
import { forwardRef as forwardRefOriginal } from 'react'

export interface PressableProps {
  disabled?: boolean
}

type Props<E extends keyof JSX.IntrinsicElements> = PressableProps &
  JSX.IntrinsicElements[E] & {
    as: E
  }

// Redeclaring!! Whaaaaat?
// thankfully, these declarations are module scoped
// so it won't overwrite others.
// We need forwardRef to be generic as well as PressableRef being generic.
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module 'react' {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

function PressableRef<E extends keyof JSX.IntrinsicElements>(
  { as, className, disabled, children, ...props }: Props<E>,
  ref: React.ForwardedRef<unknown>,
) {
  // for some reason TS complains when we use E here
  const Tag = as as React.ElementType

  const isDisabled = disabled

  return (
    <Tag
      {...props}
      onClick={props.onClick}
      disabled={isDisabled}
      className={clsx('relative inline-block cursor-pointer', className)}
      ref={ref}
    >
      <span className="bg-secondary-900 translate-y-shadow-offset absolute left-0 top-0 h-full w-full transform rounded border-2" />
      <span
        className={clsx(
          'p-6px border-dark-900 bg-primary-900 text-light-900 relative inline-block rounded border-2 font-semibold',
          'transform transition duration-200',
          'hover:-translate-y-shadow-offset',
          'active:translate-y-shadow-offset active:ease-bounce',
        )}
      >
        {children}
      </span>
    </Tag>
  )
}

export const Pressable = forwardRefOriginal(PressableRef)
