import Head from 'next/head';
import BackgroundColor from '../src/components/background-color';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Sustainable UI</title>
        <meta name="description" content="Sustainable UI in NextJS" />
      </Head>
      <BackgroundColor />
    </>
  );
}
