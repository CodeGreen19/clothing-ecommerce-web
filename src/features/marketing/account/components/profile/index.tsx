import { auth } from "@/auth";
import Logout from "./Logout";
import UpdateRole from "./UpdateRole";

const AccountProfile = async () => {
  const session = await auth();

  return (
    <div className="container m-auto min-h-screen py-5">
      {session?.user ? (
        <div>
          <ul>
            <li>{session.user.name}</li>
            <li>{session.user.email}</li>
            <li>{session.user.phoneNo}</li>
            <li>{session.user.role}</li>
            <Logout />
            <UpdateRole />
          </ul>
        </div>
      ) : (
        <div>No user exists!</div>
      )}
    </div>
  );
};

export default AccountProfile;
