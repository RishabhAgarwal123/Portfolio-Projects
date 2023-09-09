import { useContext } from "react"
import { UserContext } from "./ context/UserContext"
import UserForm from "./components/UserForm";

const Routes = () => {
    const { username, id } = useContext(UserContext);

    if (username) {
        return <div>{id}</div>
    }
  return (
    <UserForm />
  )
}

export default Routes