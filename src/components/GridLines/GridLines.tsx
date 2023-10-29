import { Container } from '@/components/Container/Container'
import clsx from 'clsx'

export function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Container className="h-full">
        <div className="relative h-full">
          <div className="gap-24px grid h-full grid-cols-4 opacity-10 lg:grid-cols-12">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className={clsx('relative border-x border-dashed ', {
                  'hidden lg:block': idx >= 4,
                })}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
