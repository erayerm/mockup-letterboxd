'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { initializeCount } from '../lib/features/counter/counterSlice'

/*
Providing the Store

To use this new makeStore function we need to create a new "client" component that will create the store
and share it using the React-Redux Provider component.

Bu yeni makeStore (lib/store.js) fonksiyonunu kullanabilmek için React-Redux Provider component'ini kullanan
store'u oluşturacak ve paylaşacak yeni bir client component oluşturmamız gerek
*/


export default function StoreProvider({ children }) {
    const storeRef = useRef()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        storeRef.current.dispatch(initializeCount(0))
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

/*

Bu kodda client component, value'nun referansını kontrol ederek re-render'ı güvenli bir şekilde yapıyor ve bir
store'un yalnızca bir kez oluşturulmasını sağlıyor. Bu component server'a atılan her istekte bir kez render
edilecek, ama ağaçta bu componentin üstünde başka bir stateful component varsa birden fazla render eylenebilir
veya bu component mutable değiştirilebilir state içeriyorsa bu durum re-render'a sebep olabilir.

Neden client component
Redux Store ile interact'a giren (yaratmak, sağlamak, okumak, yazmak) her component client component olmalıdır.
Çünkü store'a erişmek için React context gereklidir ve context sadece client component'lerde availabledır

Sıradaki step StoreProvider'ı tree'de store'un kullanılacağı yerin üstüne koymaktır. Store'u layout component'te
kullanabilirsin eğer bütün route'lar bütün layout'ların bu store'u kullanacaksa. Veya store sadece spesifik bir
route için kullanılıyorsa sadece o route için oluşturup provide'layabilirsin. Alttai kalan bütün client
component'lerde store'daki şeyleri kullanabilirsin.



In this example code we are ensuring that this client component is re-render safe by checking the value of the
reference to ensure that the store is only created once. This component will only be rendered once per request
on the server, but might be re-rendered multiple times on the client if there are stateful client components
located above this component in the tree, or if this component also contains other mutable state that causes a
re-render.

Why Client Components?
Any component that interacts with the Redux store (creating it, providing it, reading from it, or writing to it)
needs to be a client component. This is because accessing the store requires React context, and context is only
available in client components.

The next step is to include the StoreProvider anywhere in the tree above where the store is used. You can locate
the store in the layout component if all the routes using that layout need the store. Or if the store is only
used in a specific route you can create and provide the store in that route handler. In all client components
further down the tree, you can use the store exactly as you would normally using the hooks provided by react-redux.


*/