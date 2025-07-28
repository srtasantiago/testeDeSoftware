import { useNavigate, useParams } from 'react-router-dom';

const petsExemplo = [
  {
    id: 1,
    nome: 'Bob',
    raca: 'Vira-lata',
    idade: 3,
    tamanho: 'Médio',
    descricao: 'Um cachorro amigável e brincalhão',
    foto: 'https://placedog.net/400/300?id=1',
  },
  {
    id: 2,
    nome: 'Mia',
    raca: 'Siamês',
    idade: 2,
    tamanho: 'Pequeno',
    descricao: 'Gata calma e carinhosa',
    foto: 'https://placekitten.com/400/300',
  },
  {
    id: 3,
    nome: 'Thor',
    raca: 'Labrador',
    idade: 5,
    tamanho: 'Grande',
    descricao: 'Muito ativo e inteligente',
    foto: 'https://placedog.net/400/300?id=3',
  },
];

export default function Perfilpet() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const pet = petsExemplo.find((p) => p.id === Number(id));

  if (!pet) {
    return <div className="p-8">Pet não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-8 max-w-xl mx-auto">
      <img src={pet.foto} alt={pet.nome} className="rounded w-full h-64 object-cover mb-4" />
      <h1 className="text-3xl font-bold text-[#fcad0b] mb-2">{pet.nome}</h1>
      <p><strong>Raça:</strong> {pet.raca}</p>
      <p><strong>Idade:</strong> {pet.idade} anos</p>
      <p><strong>Tamanho:</strong> {pet.tamanho}</p>
      <p className="mt-4">{pet.descricao}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate('/listar')}
          className="bg-[#fcad0b] text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Voltar para a Lista
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Voltar para o Home
        </button>

        <button
          onClick={() => alert('Obrigado por querer adotar! Entraremos em contato.')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Quero Adotar 🐾
        </button>
      </div>
    </div>
  );
}
