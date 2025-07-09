export default function Perfilpet() {
  return (
    <div className="min-h-screen bg-yellow-50 p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
        <img src="https://via.placeholder.com/300" alt="Pet" className="w-full h-64 object-cover rounded-md mb-4" />
        <h1 className="text-2xl font-bold text-[#fcad0b] mb-2">Bolt</h1>
        <p className="text-gray-700 mb-1"><strong>Raça:</strong> Vira-lata</p>
        <p className="text-gray-700 mb-1"><strong>Idade:</strong> 2 anos</p>
        <p className="text-gray-700 mb-4"><strong>Descrição:</strong> Muito amigável e adora brincar!</p>
        <button className="bg-[#fcad0b] text-white px-4 py-2 rounded-full w-full hover:bg-[#e09b00]">
          Adotar
        </button>
      </div>
    </div>
  );
}
