import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

interface Props {
  title: string;
  disableHeader?: boolean;
  className?: string;
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ title = 'D-Project', disableHeader = false, children, className }) => {
  return (
    <div className={`layout bg_img_main ${className}`}>
      <Head>
        <title>{title}</title>
      </Head>

      <div>
        {/* header  */}
        {!disableHeader && <Header />}
        {children}
        {/* footer  */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
