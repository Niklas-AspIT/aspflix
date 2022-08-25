import Head from "next/head";
import Style from "../styles/Layout.module.scss";
import Logo from "../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

interface LayoutProps {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  hero?: boolean;
  hideSignIn?: boolean;
  showSignOut?: boolean;
}

const Layout = ({
  title,
  children,
  hero,
  hideSignIn,
  showSignOut,
}: LayoutProps) => {
  return (
    <div className={Style.wrapper}>
      <Head>
        <title>{title ? title : "Aspflix"}</title>
      </Head>
      {hero && <div className={Style.wrapper__hero}></div>}
      <header className={Style.wrapper__header}>
        <div className={Style.header__logo}>
          <Link href="/">
            <Image
              src={Logo}
              alt="aspflix logo"
              className={Style.logo__image}
              layout="responsive"
            />
          </Link>
        </div>

        {!hideSignIn && (
          <Link href="/signin">
            <a className={Style.header__button}>Sign in</a>
          </Link>
        )}

        {showSignOut && (
          <button
            className={Style.header__button}
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        )}
      </header>
      <main className={Style.wrapper__main}>{children}</main>
    </div>
  );
};

export default Layout;
