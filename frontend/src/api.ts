const apiRoot = 'https://july-santa-backend-production.up.railway.app'

export async function getHelloWorld() {
  const response = await fetch(apiRoot)
  const data = (await response.json()) as { Hello: 'World' }
  return data
}

export async function getJoke() {
  const response = await fetch(apiRoot + '/joke')
  const data = (await response.json()) as { joke: string }
  return data
}

interface Response {
  response: string
  imageURL: string
}

export async function getPresent(name: string) {
  const response = await fetch(apiRoot + '/present/' + name)
  const data = (await response.json()) as Response
  return data
}
