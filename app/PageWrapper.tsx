// app/pageWrapper.tsx
'use client'; // Essencial para usar o hook usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importa o hook
import React from 'react';

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pega a rota atual
  const pathname = usePathname();

  // --- Lógica para o conteúdo dinâmico ---

  // 1. Define o título do Header
  let headerTitle = 'Minhas Plantações'; // Padrão
  if (pathname === '/previsao') {
    headerTitle = 'Previsão Climática';
  } else if (pathname === '/novo-talhao') {
    // ATUALIZAÇÃO: Título da página do seu formulário
    headerTitle = 'Adicionar Novo Talhão';
  }

  // 2. Define se a barra de busca deve aparecer
  // ATUALIZAÇÃO: Esconde a busca também na pág. de formulário
  const showSearch = pathname !== '/previsao' && pathname !== '/novo-talhao';

  // ----------------------------------------

  return (
    <>
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Sement IA</h2>
          <p>Agricultura inteligente</p>
        </div>
        <nav>
          {/* ATUALIZAÇÃO: Link do Painel usa a classe .painel */}
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? '' : ''}`}
          >
            <i className="fas fa-table-cells-large"></i>
            <span>Painel de Controle</span>
          </Link>

          {/* ATUALIZAÇÃO: Link "Minhas Plantações" aponta para /
              e usa a classe .minhas (do seu CSS)
          */}
          <Link
            href="/"
            className={`nav-link ${
              pathname === '/' || pathname === '/novo-talhao' ? 'minhas' : ''
            }`}
          >
            <i className="fas fa-seedling"></i>
            <span>Minhas Plantações</span>
          </Link>

          <Link href="#" className="nav-link ">
            <i className="fas fa-clipboard-list"></i>
            <span>Tarefas Pendentes</span>
          </Link>
          <Link href="#" className="nav-link">
            <i className="fas fa-history"></i>
            <span>Atividades Recentes</span>
          </Link>
          <Link href="#" className="nav-link">
            <i className="fas fa-box"></i>
            <span>Materiais</span>
          </Link>

          <Link
            href="/previsao"
            className={`nav-link ${
              pathname === '/previsao' ? 'active' : ''
            }`}
          >
            <i className="fas fa-cloud-sun"></i>
            <span>Previsão Climática</span>
          </Link>
        </nav>
      </aside>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <main className="main-content">
        <header className="header">
          {/* Título dinâmico */}
          <h1>{headerTitle}</h1>

          <div className="header-right">
            {/* Barra de busca condicional */}
            {showSearch && (
              <div className="search-box">
                <i className="fas fa-search search-icon"></i>
                <input type="text" placeholder="Buscar..." />
              </div>
            )}

            <div className="profile-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </header>

        {/* O conteúdo da página será renderizado aqui */}
        {children}
      </main>
    </>
  );
}