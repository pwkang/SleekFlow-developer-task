import Head from 'next/head';

interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageInfo({title, description}: PageTitleProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  );
}
