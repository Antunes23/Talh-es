// app/page.tsx
'use client'; 
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'; 

// -----------------------------------------------------------------
// URL DO SEU BACKEND
// -----------------------------------------------------------------
const SUA_API_URL = 'http://localhost:8080/talhao';
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// INTERFACE ATUALIZADA PARA O JAVA
// -----------------------------------------------------------------
interface Talhao {
  idTalhao: number;       // No Java é idTalhao
  nomeTalhao: string;     // No Java é nomeTalhao
  cultura: string;
  variedade: string;
  estagioIni: string;     // No Java é estagioIni
  dataPlantio: string;    // Java envia string de data (yyyy-MM-dd)
  dataColheita: string;   
  notasAdicionais?: string; // No Java é notasAdicionais

  // Campos visuais (Frontend Only)
  progresso?: number; 
  corProgresso?: 'red' | 'yellow' | 'green'; 
  alerta?: string; 
}
// -----------------------------------------------------------------

export default function DashboardPage() {
  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os talhões
  const fetchTalhoes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Buscando dados do Spring Boot...');

      const response = await fetch(SUA_API_URL);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados. O backend está rodando?');
      }
      
      const data: Talhao[] = await response.json();
      
      // Mapeia para garantir campos visuais que o Java não manda
      const mappedData = data.map(talhao => ({
        ...talhao,
        progresso: 50, // Valor fixo por enquanto (mock)
        corProgresso: 'green' as const,
        alerta: '',
      }));

      setTalhoes(mappedData); 
      console.log('Dados carregados:', mappedData);

    } catch (err) {
      console.error("Erro completo pego no catch:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido ao buscar os dados.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Executa a busca na montagem
  useEffect(() => {
    fetchTalhoes();
  }, [fetchTalhoes]);

  // Função para excluir um talhão
  const handleDeleteTalhao = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este talhão?')) {
      return; 
    }

    try {
      setLoading(true); 
      // ATENÇÃO: Usando idTalhao na URL
      const response = await fetch(`${SUA_API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o talhão.');
      }

      console.log(`Talhão com ID ${id} excluído com sucesso!`);
      fetchTalhoes(); 
      alert('Talhão excluído com sucesso!');

    } catch (err) {
      console.error("Erro ao excluir talhão:", err);
      if (err instanceof Error) {
        alert(`Erro ao excluir: ${err.message}`);
      } else {
        alert('Ocorreu um erro desconhecido ao excluir.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ------ RENDERIZAÇÃO ------

  if (loading && talhoes.length === 0) {
    return <div className="loading-text">Carregando talhões...</div>;
  }

  if (error) {
    return (
      <div className="loading-text" style={{ color: 'red' }}>
        <strong>Erro ao carregar dados:</strong> {error}
        <p>Verifique se seu backend Spring Boot está rodando em {SUA_API_URL}</p>
      </div>
    );
  }

  return (
    <>
      <div className="plantations-grid-container">
        {talhoes.length === 0 && !loading ? (
          // Card centralizado se vazio
          <div className="add-card-center">
            <Link href="/novo-talhao" className="add-plantation-card">
              <i className="fas fa-plus"></i>
              <span>Adicionar Novo Talhão</span>
            </Link>
          </div>
        ) : (
          // Grid de cards
          <div className="plantations-grid">
            {talhoes.map((talhao) => (
              <div className="plantation-card" key={talhao.idTalhao}> {/* Usando idTalhao */}
                
                <button 
                  className="delete-card-button" 
                  onClick={() => handleDeleteTalhao(talhao.idTalhao)}
                  title="Excluir Talhão"
                  disabled={loading}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>

                <div className="plantation-card-header">
                  <span className="plantation-card-title">{talhao.nomeTalhao}</span> {/* Usando nomeTalhao */}
                  <span className="plantation-card-status">Ativo</span>
                </div>
                
                <div className="plantation-card-variety">
                  <strong>Cultura:</strong> {talhao.cultura}
                </div>
                <div className="plantation-card-variety">
                  <strong>Variedade:</strong> {talhao.variedade}
                </div>

                <div className="plantation-card-stage">
                  Estágio: {talhao.estagioIni} {/* Usando estagioIni */}
                </div>
                
                <div className="progress-bar-container">
                  <div
                    className={`progress-bar ${talhao.corProgresso}`}
                    style={{ width: `${talhao.progresso}%` }}
                  ></div>
                </div>
                
                <div className="plantation-card-dates">
                  {/* Exibindo apenas a parte da data se vier com hora */}
                  <span>Plantio: {String(talhao.dataPlantio).split('T')[0]}</span>
                  <span>Colheita: {String(talhao.dataColheita).split('T')[0]}</span>
                </div>
                
                {talhao.alerta && (
                  <div className="plantation-card-alert">{talhao.alerta}</div>
                )}
              </div>
            ))}

            {/* Botão de Adicionar no final do grid */}
            <Link href="/novo-talhao" className="add-plantation-card">
              <i className="fas fa-plus"></i>
              <span>Adicionar Novo Talhão</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}