import Link from "next/link";
import Offcanvas from '../../user/Menu';

const AuthLinks = ({ user }) => {
  const authLinks = user ? (
    <>
      <Offcanvas user={user} />
      <Link href="/auth/signout" className="btn btn-outline-danger btn-danger-shadow me-2">Sign out</Link>
    </>
  ) : (
    <>
      <Link href="/auth/signup" className="btn btn-outline-light btn-light-shadow me-2">Sign up</Link>
      <Link href="/auth/signin" className="btn btn-outline-light btn-light-shadow me-2">Sign in</Link>
    </>
  );
  return (
    <>
      <div className="d-lg-none" style={{marginTop: "4%"}}>
          {authLinks}
      </div>
      <div className="ms-auto d-none d-lg-block">
          {authLinks}
      </div>
    </>
  );
};

export default AuthLinks;
