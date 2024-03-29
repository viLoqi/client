import React from 'react'
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/core/firebase'

// import NavBar from '@/components/LoginPage/NavBar';

import useIcon from '@/hooks/useIcon'

export default function LandingPage() {
    const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth)
    const GoogleIcon = useIcon('Google')
    return (
        <>
            {/* <NavBar></NavBar> */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className={'text-5xl font-bold'}>Hello there</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button
                            className="btn gap-2"
                            onClick={() => {
                                signInWithGoogle([], { hd: 'stonybrook.edu' })
                            }}
                        >
                            {GoogleIcon}
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
