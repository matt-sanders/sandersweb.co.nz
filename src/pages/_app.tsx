import { GridLines } from '@/components/GridLines/GridLines'
import { AppProps } from 'next/app'
import { Logo } from '@/components/Logo/Logo'
import { Container } from '@/components/Container/Container'
import '@/styles/fonts.css'
import '@/styles/globals.css'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'
import { ProjectLayout } from '@/layouts/ProjectLayout/ProjectLayout'
import Link from 'next/link'

export default function App(appProps: AppProps) {
  return (
    <div className="relative min-h-screen">
      <GridLines />
      <Container className="py-24px">
        <Link href="/">
          <Logo />
        </Link>
      </Container>
      <div className="relative">
        <Layout {...appProps} />
      </div>
    </div>
  )
}

function Layout({ Component, pageProps }: AppProps) {
  switch (pageProps.layout) {
    case 'ProjectLayout': {
      const props = {
        title: '',
        bgColor: '#eaeaea',
        ...pageProps,
      }
      return (
        <ProjectLayout {...props}>
          <Component {...pageProps} />
        </ProjectLayout>
      )
    }
    default: {
      return (
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      )
    }
  }
}
