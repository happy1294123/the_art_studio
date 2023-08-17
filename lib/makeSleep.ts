export default async function makeSleep() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const re = await fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'no-cache' })
  return re.json()
}
