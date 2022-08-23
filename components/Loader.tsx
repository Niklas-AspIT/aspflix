import Style from "../styles/Loader.module.scss";
import Layout from "./Layout";

const Loader = () => {
  return (
    <Layout hero={true}>
      <div className={Style.loader}></div>
    </Layout>
  );
};

export default Loader;
