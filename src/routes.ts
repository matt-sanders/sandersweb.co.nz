export const routes = {
  projects: {
    single: (project: { slug: string }) => `/projects/${project.slug}`,
  },
}
