// app/novo-talhao/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const SUA_API_URL = 'http://localhost:8080/talhao';

export default function NovoTalhao() {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false); 

  // Estado do formulário ALINHADO COM O JAVA
  const [form, setForm] = useState({
    nomeTalhao: "",      
    cultura: "",
    variedade: "",
    estagioIni: "",      
    dataPlantio: "",     
    dataColheita: "",    
    notasAdicionais: "", 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true); 

    console.log("Enviando para o Spring Boot:", JSON.stringify(form));

    try {
      const response = await fetch(SUA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form), 
      });

      if (!response.ok) {
        // Tenta ler o erro como texto caso não seja JSON
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao salvar no backend.');
      }

      console.log('Salvo com sucesso!');
      alert('Talhão salvo com sucesso!');
      
      router.push('/'); 

    } catch (err) {
        console.error("Erro completo:", err);
        if (err instanceof Error) {
            alert(`Erro ao salvar: ${err.message}`);
        } else {
            alert('Ocorreu um erro desconhecido ao salvar.');
        }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="caixa-formulario">
      <h2 className="titulo-formulario">Adicionar Novo Talhão</h2>
      
      <form className="formulario" onSubmit={handleSubmit}>
        <label className="rotulo">Nome do talhão</label>
        <input
          type="text"
          name="nomeTalhao"  // ESSENCIAL: Igual ao Java
          placeholder="Ex: Talhão 4"
          className="campo"
          value={form.nomeTalhao}
          onChange={handleChange}
          required 
        />

        <label className="rotulo">Cultura</label>
        <input
          type="text"
          name="cultura"
          placeholder="Soja"
          className="campo"
          value={form.cultura}
          onChange={handleChange}
          required
        />

        <label className="rotulo">Variedade</label>
        <input
          type="text"
          name="variedade"
          placeholder="Ex: BMX Potência RR"
          className="campo"
          value={form.variedade}
          onChange={handleChange}
          required
        />

        <label className="rotulo">Estágio Inicial</label>
        <input
          type="text"
          name="estagioIni" // ESSENCIAL: Igual ao Java
          placeholder="Floração"
          className="campo"
          value={form.estagioIni}
          onChange={handleChange}
          required
        />

        <div className="grupo-duplo">
          <div className="campo-grupo">
            <label className="rotulo">Data do Plantio</label>
            <input
              type="date"
              name="dataPlantio" // ESSENCIAL: Igual ao Java
              className="campo"
              value={form.dataPlantio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-grupo">
            <label className="rotulo">Data da Colheita</label>
            <input
              type="date"
              name="dataColheita" // ESSENCIAL: Igual ao Java
              className="campo"
              value={form.dataColheita}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label className="rotulo">Notas adicionais</label>
        <textarea
          name="notasAdicionais" // ESSENCIAL: Igual ao Java
          placeholder=""
          className="campo campo-texto"
          rows={4}
          value={form.notasAdicionais}
          onChange={handleChange}
        ></textarea>

        <div className="botoes">
          <Link href="/" className="botao botao-cancelar">
            Cancelar
          </Link>
          
          <button 
            type="submit" 
            className="botao botao-salvar"
            disabled={isLoading} 
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}