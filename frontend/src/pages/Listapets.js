import { Link } from 'react-router-dom';

const petsExemplo = [
  { id: 1, nome: 'Bob', raca: 'Vira-lata', idade: 3, tamanho: 'Médio' },
  { id: 2, nome: 'Mia', raca: 'Siamês', idade: 2, tamanho: 'Pequeno' },
  { id: 3, nome: 'Thor', raca: 'Labrador', idade: 5, tamanho: 'Grande' },
];

export default function Listapets() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#fcad0b]">Pets para adoção</h2>
      <ul>
        {petsExemplo.map(pet => (
          <li key={pet.id} className="mb-4 border p-4 rounded shadow-sm">
            <strong>{pet.nome}</strong> - {pet.raca} - {pet.idade} anos - {pet.tamanho}
            <div className="mt-2">
              <Link to={`/perfil/${pet.id}`} className="text-[#fcad0b] hover:underline">
              
                Ver perfil
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link
        to="/cadastropet"
        className="inline-block mt-6 bg-[#fcad0b] text-white font-bold py-2 px-4 rounded"
      >
        Cadastrar novo pet
      </Link>
    </div>
  );
}
