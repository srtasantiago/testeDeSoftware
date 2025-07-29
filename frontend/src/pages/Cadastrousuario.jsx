import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const jaExiste = usuarios.some(u => u.email === formData.email);

    if (jaExiste) {
      alert("Já existe um usuário com esse e-mail.");
      return;
    }

    const listaAtualizada = [...usuarios, formData];
    localStorage.setItem('usuarios', JSON.stringify(listaAtualizada));

    alert("Cadastro realizado com sucesso! Agora faça o login.");
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[#fcad0b] mb-2">Crie sua conta</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Cadastre-se agora e conheça seu novo amigo de quatro patas! 🐾
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="nome" className="font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Seu nome"
            className="p-3 border rounded"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-medium">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu e-mail"
            className="p-3 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="senha" className="font-medium">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Crie uma senha"
            className="p-3 border rounded"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#fcad0b] text-white font-bold py-2 px-4 rounded w-full hover:bg-[#e09b00] mt-4"
        >
          Cadastrar
        </button>
      </form>

      {/* Links adicionais */}
      <div className="mt-6 flex flex-col gap-2 text-center">
        <Link to="/" className="text-blue-600 hover:underline">
          Voltar para tela inicial (login)
        </Link>
        <Link to="/listapets" className="text-blue-600 hover:underline">
          Ver lista de pets para adoção
        </Link>
      </div>
    </div>
  );
}
