import styled from 'styled-components'

type A = {
  name: string
}

// Typeにパラメーターを追加する場合, interfaceを使う
interface C extends A {
  password: string
}

// Genericsにパラメータを追加する場合
type B<T extends {foo: string}> = {
  user: T
}

const a: A= {name: 'name'}
const b: B<{bar: string, foo: string}> = {user: {bar: 'bar', foo: 'foo'}}
const c: C = {name: 'name', password: 'password'}

console.log(a)
console.log(c)
console.log(b)

const Top = () => {
  return (
    <>
      <Container>
        <h2>Top</h2>
      </Container>
    </>
  )
}

export default Top

const Container = styled.div`
  text-align: center;
`
