import { GridLines } from '@/components/GridLines/GridLines'
import { AppProps } from 'next/app'
import { Logo } from '@/components/Logo/Logo'
import { Container } from '@/components/Container/Container'
import '@/styles/fonts.css'
import '@/styles/globals.css'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'
import { ProjectLayout } from '@/layouts/ProjectLayout/ProjectLayout'
import Link from 'next/link'
import Head from 'next/head'

const year = new Date().getFullYear()

export default function App(appProps: AppProps) {
  return (
    <div className="relative min-h-screen">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <GridLines />
      <Container className="py-24px">
        <Link href="/">
          <Logo />
        </Link>
      </Container>
      <div className="relative">
        <Layout {...appProps} />
      </div>
      <Container>
        <footer className="mt-24px pt-12px pb-24px border-t-2">
          <p>matt@sandersweb.co.nz</p>
          <p>&copy; {year} Sanders Web Development</p>
        </footer>
      </Container>
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
