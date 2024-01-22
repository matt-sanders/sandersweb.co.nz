import { FaGithub } from 'react-icons/fa'
import { GridLines } from '@/components/GridLines/GridLines'
import { AppProps } from 'next/app'
import { Container } from '@/components/Container/Container'
import '@/styles/fonts.css'
import '@/styles/globals.css'
import Head from 'next/head'

const year = new Date().getFullYear()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative min-h-screen text-dark-900">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <GridLines />
      <div className="relative">
        <Component {...pageProps} />
      </div>
      <Container>
        <footer className="mt-24px border-t-2 pb-24px pt-12px">
          <a
            href="https://www.github.com/matt-sanders"
            target="_blank"
            rel="noopener noreferrer"
            className="text-700"
          >
            <FaGithub />
          </a>
          <p>matt@sandersweb.co.nz</p>
          <p>&copy; {year} Sanders Web Development</p>
        </footer>
      </Container>
    </div>
  )
}
