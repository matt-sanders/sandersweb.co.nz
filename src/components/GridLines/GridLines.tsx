import { Container } from '@/components/Container/Container'
import clsx from 'clsx'

export function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Container className="h-full">
        <div className="relative h-full">
          <div className="gap-24px border-dark-900 grid h-full grid-cols-4 border-l border-r border-dashed opacity-10 md:grid-cols-12">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className={clsx('relative', {
                  'hidden md:block': idx >= 4,
                })}
              >
                {idx > 0 && (
                  <div className="-translate-x-12px border-dark-900 absolute bottom-0 right-full top-0 transform border-l border-dashed" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
