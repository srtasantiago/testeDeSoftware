const pets = [
  { id: 1, nome: "Bolt", idade: 2, raca: "Vira-lata", imagem: "https://via.placeholder.com/150" },
  { id: 2, nome: "Luna", idade: 1, raca: "Poodle", imagem: "https://via.placeholder.com/150" },
  { id: 3, nome: "Rex", idade: 4, raca: "Pastor Alemão", imagem: "https://via.placeholder.com/150" }
];

export default function Listapets() {
  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-center text-[#fcad0b] mb-8">Pets para Adoção</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-xl shadow-md p-4 text-center">
            <img src={pet.imagem} alt={pet.nome} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-bold text-[#fcad0b]">{pet.nome}</h2>
            <p className="text-gray-600">Raça: {pet.raca}</p>
            <p className="text-gray-600">Idade: {pet.idade} ano(s)</p>
            <button className="mt-4 bg-[#fcad0b] text-white px-4 py-2 rounded-full hover:bg-[#e09b00]">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
