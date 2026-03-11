import { useState, useEffect } from 'react'
import SplashScreen from './SplashScreen'

export default function SplashWrapper() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('splash_done')) {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <SplashScreen
      onComplete={() => {
        sessionStorage.setItem('splash_done', '1')
        setShow(false)
      }}
    />
  )
}
