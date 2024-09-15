import { AuthProvider } from "./context/AuthContext"
import { Navigation } from "./routes/Navigation"


export const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App
