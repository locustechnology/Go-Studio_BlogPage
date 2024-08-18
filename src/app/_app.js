import Layout from "./component/layout";
import "./globals.css";

function MyApp ({ Component, pageProps })  {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp