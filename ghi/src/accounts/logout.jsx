import useToken from "../../auth/authorization";
import { useAuthContext } from "../../auth/authorization";


export default function Nav() {
const { logout } = useToken();
const { token } = useAuthContext();
    return (
        <div>
            
        </div>
    )
}
