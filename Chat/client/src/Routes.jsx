import { useContext } from "react"
import { UserContext } from "./ context/UserContext"
import UserForm from "./components/UserForm";
import Chat from "./components/Chat";

const Routes = () => {
    const { username } = useContext(UserContext);

    if (username) {
        return <Chat />
    }
  return (
    <UserForm />
  )
}

export default Routes