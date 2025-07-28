import { FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/animations.css'; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-300 to-orange-400 animate-fade-in text-center px-4">
      <h1 className="text-white text-5xl md:text-6xl font-bold flex items-center gap-2 mb-4">
        <FaPaw style={{ color: '#f6c23e' }} size={40} />
        ConectaPatas
        <FaPaw style={{ color: '#f6c23e' }} size={40} />
      </h1>
      <p className="text-white text-lg md:text-xl mb-6">
        Encontre seu novo melhor amigo!
      </p>

      {/* Imagem opcional de mascote */}
      {/* <img src="/images/mascote.svg" alt="Mascote" className="w-32 h-32 mb-6" /> */}

      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-white text-[#fcad0b] font-semibold px-6 py-2 rounded-full shadow-md hover:bg-yellow-100 transition-all duration-300">
            Entrar
          </button>
        </Link>
        <Link to="/cadastropet">
          <button className="bg-white text-[#fcad0b] font-semibold px-6 py-2 rounded-full shadow-md hover:bg-yellow-100 transition-all duration-300">
            Cadastrar
          </button>
        </Link>
      </div>
    </div>
  );
}
