import styled from 'styled-components'
import {Suspense, useState, FC} from "react"
import {sleep} from "../lib"

const Top = () => {
  return (
    <>
      <Container>
        <h2>Top</h2>
        <Description />
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

export default Top

const Container = styled.div`
  text-align: center;
`
