import { FaPaw } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const senha = event.target.password.value;

    if (email === 'teste@email.com' && senha === '123456') {
      navigate('/listar');
    } else {
      alert('E-mail ou senha inválidos!');
    }
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6 flex items-center justify-center gap-2">
          <FaPaw className="text-yellow-400" />
          Login no ConectaPatas
          <FaPaw className="text-yellow-400" />
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
