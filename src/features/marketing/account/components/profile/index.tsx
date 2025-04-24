import { auth } from "@/auth";
import Logout from "./Logout";

const AccountProfile = async () => {
  const session = await auth();

  return (
    <div className="container m-auto min-h-screen p-5 py-5">
      {session?.user ? (
        <div>
          <ul className="space-y-2">
            <li>mame: {session.user.name}</li>
            <li>email: {session.user.email}</li>
            <li>phoneNo: {session.user.phoneNo}</li>
            <li>Role: {session.user.role}</li>
            <Logout />
          </ul>
        </div>
      ) : (
        <div>No user exists!</div>
      )}
    </div>
  );
};

export default AccountProfile;
