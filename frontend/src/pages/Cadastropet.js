import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cadastropet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    idade: '',
    tamanho: '',
    descricao: '',
    foto: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    alert(`Pet ${formData.nome} cadastrado com sucesso!`);
    navigate('/listar'); 
  }

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[#fcad0b] mb-6">Cadastrar Novo Pet</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="w-full p-2 border rounded"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="raca"
          placeholder="Raça"
          className="w-full p-2 border rounded"
          value={formData.raca}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="idade"
          placeholder="Idade"
          className="w-full p-2 border rounded"
          value={formData.idade}
          onChange={handleChange}
          required
        />
        <select
          name="tamanho"
          className="w-full p-2 border rounded"
          value={formData.tamanho}
          onChange={handleChange}
          required
        >
          <option value="">Tamanho</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select>
        <textarea
          name="descricao"
          placeholder="Descrição"
          className="w-full p-2 border rounded"
          rows={4}
          value={formData.descricao}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="foto"
          placeholder="URL da foto"
          className="w-full p-2 border rounded"
          value={formData.foto}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-[#fcad0b] text-white font-bold py-2 px-4 rounded w-full hover:bg-[#e09b00]"
        >
          Cadastrar Pet
        </button>
      </form>
    </div>
  );
}
