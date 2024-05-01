import { FiBox, FiTruck, FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 w-80 h-80 p-6 rounded-lg cursor-pointer" onClick={() => navigate('/inventary')}>
          <div className="flex flex-col items-center justify-center h-full">
            <FiBox className="text-9xl text-white" />
            <p className="mt-6 text-3xl font-bold text-white">
              Inventario
            </p>
          </div>
        </div>

        <div className="bg-green-500 w-80 h-80 p-6 rounded-lg cursor-pointer"onClick={() => navigate('/envios')}>
          <div className="flex flex-col items-center justify-center h-full">
            <FiTruck className=" text-9xl text-white" />
            <p className="mt-6 text-3xl font-bold text-white"> 
            Envios
            </p>
          </div>
        </div>

        <div className="bg-yellow-500 w-80 h-80 p-6 rounded-lg cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full">
            <FiDownload className="text-9xl text-white" />
            <p className="mt-6 text-3xl font-bold text-white"> 
            Devoluciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
