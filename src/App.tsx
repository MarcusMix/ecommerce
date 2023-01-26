import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FunctionComponent, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Componentes
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import Loading from './components/loading/loading.components'
import Cart from './components/cart/cart.component'
import CheckoutPage from './pages/checkout/checkout.page'
import ExplorePage from './pages/explore/explore.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmation.page'

//Ultilities
import { auth, db } from './config/firebase.config'
import { userConverter } from './converters/firestore.converters'
import AuthenticationGuard from './components/guards/authentication.guard'
import { loginUser, logoutUser } from './store/toolkit/user/user.slice'
import { useAppSelector } from './hooks/redux.hooks'


const App: FunctionComponent = () => {

  const [isInitializing, setInitializing] = useState(true);

  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector((rootReducer) => rootReducer.userReducer)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        dispatch(logoutUser())

        return setInitializing(false)
      }

      const isSigningIn = !isAuthenticated && user

      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(collection(db, 'users').withConverter(userConverter), where('id', '==', user.uid))
        )

        const userFromFirestore = querySnapshot.docs[0]?.data()


        dispatch(loginUser(userFromFirestore))

        return setInitializing(false)
      }

      return setInitializing(false)
    })
  }, [dispatch])

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route
          path='/checkout'
          element={
            <AuthenticationGuard>
              <CheckoutPage />
            </AuthenticationGuard>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/payment-confirmation' element={<PaymentConfirmationPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  )
}

export default App

