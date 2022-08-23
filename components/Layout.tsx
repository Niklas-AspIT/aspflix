import Head from "next/head";
import Style from "../styles/Layout.module.scss";

interface LayoutProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className={Style.wrapper}>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={Style.wrapper__header}></header>
      <main className={Style.wrapper__main}></main>
    </div>
  );
};

export default Layout;
