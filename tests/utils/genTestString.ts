/**
 * Creates a random string that can be used to mimick text.
 * Like lorem ipsum, but simpler.
 */
export const genTestString = (): string => {
  const length = 10
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
