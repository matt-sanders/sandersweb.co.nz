import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  options: {
    recmaPlugins: [recmaNextjsStaticProps],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
