import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md text-black font-bold">
        <h1 className=" text-2xl text-center">
          CADASTRO
        </h1>
        <div className="flex flex-col gap-y-4">
          <h1>Nome:</h1>
          <input type="text" placeholder="Nome completo"
            className="w-full p-3 border rounded-xl"/>

          <h1>Email:</h1>
          <input type="email" placeholder="Email"
            className="w-full p-3 border rounded-xl"/>

          <h1>Data Nascimento:</h1>
          <input type="date" placeholder="Email"
            className="w-full p-3 border rounded-xl"/>

          <h1>Senha:</h1>
          <input type="password" placeholder="Password"
            className="w-full p-3 border rounded-xl"/>
        </div>
      </div>
    </div>
  );
}
