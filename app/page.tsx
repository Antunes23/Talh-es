'use client'; // Necessário para buscar dados
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Para o link do card de "Adicionar"

// Definição do tipo de dados (o que vem do seu MySQL)
interface Talhao {
  id: number;
  nome: string;
  variedade: string;
  estagio: string;
  dataPlantio: string;
  dataColheita: string;
  progresso: number;
  corProgresso: 'red' | 'yellow' | 'green';
  alerta?: string;
}

export default function DashboardPage() {
  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulação da busca de dados
  useEffect(() => {
    console.log('Buscando dados no banco...');
    setTimeout(() => {
      // ATUALIZAÇÃO: Começando com a lista vazia
      setTalhoes([]);
      
      setLoading(false);
      console.log('Dados carregados!');
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading-text">Carregando talhões...</div>;
  }

  return (
    <>
      <div className="plantations-grid">
        {/* Mapeamento dos dados (não vai mostrar nada de início) */}
        {talhoes.map((talhao) => (
          <div className="plantation-card" key={talhao.id}>
            <div className="plantation-card-header">
              <span className="plantation-card-title">{talhao.nome}</span>
              <span className="plantation-card-status">Ativo</span>
            </div>
            <div className="plantation-card-variety">
              Variedade: {talhao.variedade}
            </div>
            <div className="plantation-card-stage">
              Estágio: {talhao.estagio}
            </div>
            <div className="progress-bar-container">
              <div
                className={`progress-bar ${talhao.corProgresso}`}
                style={{ width: `${talhao.progresso}%` }}
              ></div>
            </div>
            <div className="plantation-card-dates">
              <span>Plantio: {talhao.dataPlantio}</span>
              <span>Colheita: {talhao.dataColheita}</span>
            </div>
            {talhao.alerta && (
              <div className="plantation-card-alert">{talhao.alerta}</div>
            )}
          </div>
        ))}

        {/* O Card de "Adicionar" que leva para seu formulário */}
        <Link href="/novo-talhao" className="add-plantation-card">
          <i className="fas fa-plus"></i>
          <span>Adicionar Novo Talhão</span>
        </Link>
      </div>
    </>
  );
}