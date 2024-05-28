const SessionContext = React.createContext(null)

function main() {
  const [session, setSession] = React.useState(null)

  React.useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      <App />
    </SessionContext.Provider>
  )
}



