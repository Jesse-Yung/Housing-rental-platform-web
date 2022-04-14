import { useState, useEffect } from 'react'
import { Session} from '../share/models'

const sessionKey = '_production_app_session'

let sessionIsLoaded: boolean = false

let currentSession: Session | undefined = undefined

function loadSessionIfNeeded() {
    if (sessionIsLoaded) {
        return
    }
    const item = localStorage.getItem(sessionKey)
    if (item && item !== null && item !== '') {
        currentSession = JSON.parse(item)
    }
    sessionIsLoaded = true
}

type SetSession = (session: Session | undefined) => void

const savedSetSessions: SetSession[] = []

export function setSessionWithSync(session: Session | undefined) {
    currentSession = session
    if (session) {
        localStorage.setItem(sessionKey, JSON.stringify(session))
    } else {
        localStorage.removeItem(sessionKey)
    }
    for (const setSession of savedSetSessions) {
        setSession(session)
    }
}

export default function useSession(): [Session | undefined, SetSession] {
    loadSessionIfNeeded()
    const [session, setSession] = useState<Session | undefined>(currentSession)
    useEffect(() => {
        savedSetSessions.push(setSession)
        return () => {
            savedSetSessions.splice(savedSetSessions.indexOf(setSession), 1)
        }
    }, [])
    return [session, setSessionWithSync]
}


export function getSessionToken(): String | undefined {
    if (!currentSession) {
        return undefined
    } else {
        return (currentSession as Session).token
    }
}
