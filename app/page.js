'use client'

//import { useSelector, useDispatch } from 'react-redux'
//import { decrement, increment } from '../lib/features/counter/counterSlice'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  //const count = useSelector(state => state.counter.value)
  //const dispatch = useDispatch()


  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

  return (
    <main>
      <div>
        Home

        {/*
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
        */}
      </div>
    </main>
  );
}
