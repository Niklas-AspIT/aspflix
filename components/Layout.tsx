import Head from "next/head";
import Style from "../styles/Layout.module.scss";

interface LayoutProps {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  hero?: boolean;
}

const Layout = ({ title, children, hero }: LayoutProps) => {
  return (
    <div className={Style.wrapper}>
      <Head>
        <title>{title ? title : "Aspflix"}</title>
      </Head>
      {hero && <div className={Style.wrapper__hero}></div>}
      <header className={Style.wrapper__header}>Aspflix</header>
      <main className={Style.wrapper__main}>{children}</main>
    </div>
  );
};

export default Layout;
