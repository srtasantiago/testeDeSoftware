export default function Cadastropet() {
  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[#fcad0b] mb-6">Cadastrar Novo Pet</h1>
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <input type="text" placeholder="Nome" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Raça" className="w-full p-2 border rounded" />
        <input type="number" placeholder="Idade" className="w-full p-2 border rounded" />
        <select className="w-full p-2 border rounded">
          <option value="">Tamanho</option>
          <option value="pequeno">Pequeno</option>
          <option value="médio">Médio</option>
          <option value="grande">Grande</option>
        </select>
        <textarea placeholder="Descrição" className="w-full p-2 border rounded" rows="4"></textarea>
        <input type="file" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-[#fcad0b] text-white font-bold py-2 px-4 rounded w-full hover:bg-[#e09b00]">
          Cadastrar Pet
        </button>
      </form>
    </div>
  );
}


