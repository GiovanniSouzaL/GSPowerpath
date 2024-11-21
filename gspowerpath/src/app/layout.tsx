import { ReactNode } from 'react';
import Cabecalho from '../components/Cabecalho/Cabecalho';
import Rodape from '../components/Rodape/Rodape';
import './globals.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main>{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
