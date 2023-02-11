import styled from 'styled-components'
import {Suspense, useState, FC, useEffect} from "react"
import {sleep} from "../lib"
import {axiosClient} from "../api/axios"
import {User} from "../types/user"

const Top = () => {
  return (
    <>
      <Container>
        <h2>Top</h2>
        <Description />
        <Users />
      </Container>
    </>
  )
}

export const SometimesSuspend: FC = () => {
  if (Math.random() < 0.5) {
    throw sleep(100)
  }
  return <p>Hello, world!</p>
}

const Description = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <SometimesSuspend />
        <button className="border p-1" onClick={() => setCount((c) => c + 1)}>
          {count}
        </button>
      </Suspense>
    </>
  )
}

const Users = () => {
  const users = useUser()

  return (
    <>
      {/* NOTE: mapでないと表示されない */}
      {users.map((user, index) => <p key={index}>{`${user.id}: ${user.name}`}</p>)}
    </>
  )
}

const useUser = () => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const getUsers = async () => {
      const res = await axiosClient.get('users')
      return res.data
    }
    getUsers().then((users) => setUsers(users))
  }, [])

  return users
}

export default Top

const Container = styled.div`
  text-align: center;
`
