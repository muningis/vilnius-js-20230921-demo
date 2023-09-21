import { safeFetch } from '../utils/safe-fetch'
import { userSchema } from '../schemas/user.schema'

export const getUsers = safeFetch(userSchema.array(), "https://jsonplaceholder.typicode.com/users");

