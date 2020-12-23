import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import Link from "next/link";
import fetch from "node-fetch";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/2e0e6102e4484b249f5498b0d557a659"
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
    revalidate: 1,
  };
}

const Home = ({ blockMap }) => (
  <div>
    <Head>
      <style>{`body { margin: 0;}`}</style>
      <title>react-notion example</title>
    </Head>
    <NotionRenderer
      blockMap={blockMap}
      fullPage
      hideHeader
      customBlockComponents={{
        page: ({ blockValue, renderComponent }) => (
          <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
        ),
      }}
    />
  </div>
);

export default Home;
