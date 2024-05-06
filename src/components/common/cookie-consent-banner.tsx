'use client'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import CookieConsent from 'react-cookie-consent'
import { createPortal } from 'react-dom'

const CookieConsentBanner = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [consentCookie] = useCookies(['myCookieConsent'])

  useEffect(() => {
    if (!consentCookie.myCookieConsent) setOpen(true)
  }, [consentCookie])

  if (!isOpen) return null

  return createPortal(
    <div
      className="flex items-center justify-center p-5"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      <CookieConsent
        onAccept={() => setOpen(false)}
        location="bottom"
        buttonText="Accept"
        cookieName="myCookieConsent"
        style={{
          position: 'relative',
          maxWidth: '100vw',
          maxHeight: '50vh',
          width: '400px',
          height: 'auto',
          backgroundColor: 'white',
          color: 'black',
        }}
        buttonStyle={{ background: '#ffd900', color: 'black' }}
        expires={365}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>,
    document.body
  )
}

export default CookieConsentBanner
