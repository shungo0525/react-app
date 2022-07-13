import React, {
  useState,
  useCallback,
} from "react";

// 子コンポーネントをメモ化する
// propsが変更されると再レンダリングされる
const Child = React.memo((props) => {
  console.log("render Child");
  // メモ化したコンポーネントにcallback関数を渡す
  return (
    <>
      <p>{props.count2}</p>
      <button onClick={props.handleClick}>Child button</button>
    </>
  )
});
// ref: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// 開発環境でのデバッグ時に、複数のコンポーネントが存在する場合エラーメッセージからのデバッグが難しくなってしまう
Child.displayName = 'Child';

const App = () => {
  console.log("render App");
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  // 関数をメモ化すれば、新しい handleClick と前回の handleClick は等価になる。そのため、Child コンポーネントは再レンダリングされない。
  const handleClick = useCallback(() => {
    console.log("clicked child button");
  }, []);

  //　メモ化しない場合
  // const handleClick = () => {
  //   console.log("clicked child button");
  // };

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <button onClick={() => setCount2(count2 + 1)}>Count up child count</button>
      <Child handleClick={handleClick} count2={count2}/>
    </>
  );
};

export default App;

// ref: https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2

// ref: https://penpen-dev.com/blog/react-memo-usecallback-usememo/
// React.memo: コンポーネントをメモ化。propsが変更されないと、再レンダリングされないようにする。コンポーネントをラップする。
// useCallback: 関数をメモ化。コンポーネント内で使う

// ref: https://blog.uhy.ooo/entry/2021-02-23/usecallback-custom-hooks/
// カスタムフック内の関数にはuseCallbackを使ったほうがよいかも
