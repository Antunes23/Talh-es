"use client";

import { useState } from "react";
import Link from "next/link"; // ATUALIZAÇÃO: Importar o Link

export default function NovoTalhao() {
  const [form, setForm] = useState({
    talhao: "",
    cultura: "",
    variedade: "",
    estagio: "",
    plantio: "",
    colheita: "",
    notas: "",
  });

  // ATUALIZAÇÃO: Função para lidar com a mudança nos inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // ATUALIZAÇÃO: handleCancelar não é mais necessário,
  // pois o botão "Cancelar" será um Link.
  
  // (Aqui você adicionaria sua função handleSubmit para salvar no MySQL)
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Salvando no banco:", form);
  //   // ...chamar sua API aqui...
  // };

  return (
    <div className="caixa-formulario">
      <h2 className="titulo-formulario">Minhas Plantações</h2>
      {/* ATUALIZAÇÃO: Adicionar o onSubmit no form */}
      <form className="formulario" /* onSubmit={handleSubmit} */>
        <label className="rotulo">Nome o talhão</label>
        <input
          type="text"
          name="talhao"
          placeholder="Ex: Talhão 4"
          className="campo"
          value={form.talhao}
          onChange={handleChange} // ATUALIZAÇÃO: Adicionado
        />

        <label className="rotulo">Cultura</label>
        <input
          type="text"
          name="cultura"
          placeholder="Soja"
          className="campo"
          value={form.cultura}
          onChange={handleChange} // ATUALIZAÇÃO: Adicionado
        />

        <label className="rotulo">Variedade</label>
        <input
          type="text"
          name="variedade"
          placeholder="Ex: BMX Potência RR"
          className="campo"
          value={form.variedade}
          onChange={handleChange} // ATUALIZAÇÃO: Adicionado
        />

        <label className="rotulo">Estágio Inicial</label>
        <input
          type="text"
          name="estagio"
          placeholder="Floração"
          className="campo"
          value={form.estagio}
          onChange={handleChange} // ATUALIZAÇÃO: Adicionado
        />

        <div className="grupo-duplo">
          <div className="campo-grupo">
            <label className="rotulo">Data do Plantio</label>
            <input
              type="date"
              name="plantio"
              className="campo"
              value={form.plantio}
              onChange={handleChange} // ATUALIZAÇÃO: Adicionado
            />
          </div>

          <div className="campo-grupo">
            <label className="rotulo">Data da Colheita</label>
            <input
              type="date"
              name="colheita"
              className="campo"
              value={form.colheita}
              onChange={handleChange} // ATUALIZAÇÃO: Adicionado
            />
          </div>
        </div>

        <label className="rotulo">Notas adicionais</label>
        <textarea
          name="notas"
          placeholder=""
          className="campo campo-texto"
          rows={4}
          value={form.notas}
          onChange={handleChange} // ATUALIZAÇÃO: Adicionado
        ></textarea>

        <div className="botoes">
          {/* ATUALIZAÇÃO: Botão Cancelar agora é um Link para a home */}
          <Link href="/" className="botao botao-cancelar">
            Cancelar
          </Link>
          <button type="submit" className="botao botao-salvar">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}