import { ZodError } from 'zod';
import './App.css'
import { getUsers } from './models/user.model';
import { useSafeFetch } from './utils/use-safe-fetch';

function App() {
  const { data: users, error, state } = useSafeFetch(getUsers);

  if (error) {
    if (error instanceof ZodError) {
      return <ul>{error.issues.map(issue => <li>{issue.path.join(".")} has an error: {issue.message}</li>)}</ul>
    }
    return <p>{error.message}</p>
  }
  if (state === "loading") return <>Loading...</>
  if (!users) return <>No data has been found</>

  return (
    <article>
      {users.map(user => (<pre key={user.id}>{JSON.stringify(user, null, "  ")}</pre>))}
    </article>
  )
}

export default App
