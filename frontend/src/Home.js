export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcad0b]">
      <h1 className="text-white text-5xl font-bold">ConectaPatas</h1>
      <p className="text-white mt-4">Encontre seu novo melhor amigo!</p>
      <div className="mt-6 space-x-4">
        <button className="bg-white text-[#fcad0b] font-semibold px-6 py-2 rounded-full">
          Entrar
        </button>
        <button className="bg-white text-[#fcad0b] font-semibold px-6 py-2 rounded-full">
          Cadastrar
        </button>
      </div>
    </div>
  );
}
