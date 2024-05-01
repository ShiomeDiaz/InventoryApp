import React, { useEffect, useState, useMemo } from 'react';
import { fetchComputer, deleteComputer } from '../../services/endpoints/Endpoint.computer';
import { DeleteConfirmationModal} from './../../components/molecules';
import {CreateComputerModal, UpdateComputerModal, ComputerDetailsModal} from "./../../components/Modals"
import { useAuth} from './../../context';
import { FaPlusCircle} from 'react-icons/fa';
import { TbTrashX } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import { PiInfo } from "react-icons/pi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactPaginate from 'react-paginate';

export function Inventary() {
  const [computers, setComputers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [computerToDelete, setComputerToDelete] = useState(null);
  const [computerToUpdate, setComputerToUpdate] = useState({});

  const [computerDetails, setComputerDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { isUserAdmin } = useAuth(); // Usa el hook de autenticación

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchComputer()
      .then(computers => setComputers(computers))
      .catch(error => console.log(error));
  }, []);

  // const handleDelete = async () => {
  //   try {
  //     // Verificar el rol del usuario antes de permitir la eliminación
  //     if (userRole !== 'admin') {
  //       console.error('Unauthorized: User does not have permission to delete computers');
  //       return;
  //     }
  
  //     const success = await deleteComputer(computerToDelete);
  //     if (success) {
  //       setComputers(prev => prev.filter(computer => computer.ID !== computerToDelete));
  //       console.log("Computer deleted successfully");
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete computer:', error);
  //   } finally {
  //     setShowModal(false);
  //     setComputerToDelete(null);
  //   }
  // };

  const handleDelete = async () => {
    if (!isUserAdmin()) {
      console.error('Unauthorized: User does not have permission to delete computers');
      alert('No autorizado: Solo los administradores pueden eliminar computadores.');
      return;
    }

    try {
      const success = await deleteComputer(computerToDelete);
      if (success) {
        setComputers(prev => prev.filter(computer => computer.ID !== computerToDelete));
        console.log("Computer deleted successfully");
      }
    } catch (error) {
      console.error('Failed to delete computer:', error);
    } finally {
      setShowModal(false);
      setComputerToDelete(null);
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
const handleEdit = (computer) => {
  if (computer) {
    setComputerToUpdate(computer);
    setShowUpdateModal(true);
  } else {
    console.error("No se proporcionaron datos del computador para la actualización.");
    // Manejar este caso de error como consideres necesario
  }
};

const handleMoreInfo = (computer) => {
  setComputerDetails(computer);
  setShowDetailsModal(true);
};


  const sortedAndFilteredComputers = useMemo(() => {
    return computers.filter(computer =>
      Object.values(computer).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [computers, searchTerm, sortField, sortOrder]);

  const pageCount = Math.ceil(sortedAndFilteredComputers.length / itemsPerPage);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentItems = sortedAndFilteredComputers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  
  

  return (
<div className="p-5">
  <div className="flex flex-col">
    <div className="mb-4">
      <h1 className="text-xxl text-gray-700 font-bold font-roboto text-center">Inventario de Computadores</h1>
    </div>
    <div className="flex justify-between items-center mb-5">
      <button onClick={() => setShowCreateModal(true)} className=" flex flex-row justify-between bg-dark-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow-md sm:rounded-lg">
      Nuevo
        <FaPlusCircle className="pl-1 mt-0.5 text-xl" />
      </button>
      <input
  type="text"
  placeholder="Buscar computadores..."
  value={searchTerm}
  onChange={handleSearchChange}
  className="px-4 py-2 rounded shadow-md sm:rounded-lg text-dark-purple"
/>

    </div>
  </div>
      <section>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full table-auto text-left bg-white text-sm rtl:text-right">
            <thead className="border-b bg-dark-blue text-white font-bold uppercase text-x justify-center items-center">
              <tr>
                <th className="px-4 py-2 justify-center items-center ">AFID</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSortChange('Type')}>
                  Tipo de Computador {sortField === 'Type' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-2">Marca</th>
                <th className="px-4 py-2">Modelo</th>
                <th className="px-4 py-2">Procesador</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSortChange('RAM')}>
                  Memoria RAM (GB) {sortField === 'RAM' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSortChange('Storage')}>
                  Almacenamiento (GB) {sortField === 'Storage' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-2">Tarjeta Gráfica</th>
                <th className="px-4 py-2">Batería</th>
                <th className="px-4 py-2">Estado Actual</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(computer => (
                <tr key={computer.ID} className="border-b text-gray-800 font-semibold">
                  <td className="px-4 py-2">{computer.CompanyID}</td>
                  <td className="px-4 py-2">{computer.Type}</td>
                  <td className="px-4 py-2">{computer.Brand}</td>
                  <td className="px-4 py-2">{computer.Reference}</td>
                  <td className="px-4 py-2">{computer.Processor}</td>
                  <td className="px-4 py-2">{computer.RAM+" GB"}</td>
                  <td className="px-4 py-2">{computer.Storage+" GB"}</td>
                  <td className="px-4 py-2">{computer.GPU}</td>
                  <td className="px-4 py-2">{computer.Battery}</td>
                  <td className="px-4 py-2">{computer.Status}</td>
                  <td className="px-4 py-2 flex justify-start items-center">
                    <Tippy content="Mas información">
                      <button className="p-1 rounded-full text-light-green hover:bg-blue-100"onClick={() => handleMoreInfo(computer)}>
                        <PiInfo className="text-2xl" />
                      </button>
                    </Tippy>
                    <Tippy content="Editar">
                      <button className="p-1 rounded-full text-dark-blue hover:bg-blue-100"onClick={() => handleEdit(computer)}>
                        <RiEdit2Line className="text-2xl" />
                      </button>
                    </Tippy>
                    <Tippy content="Eliminar">
                      <button className="p-1 rounded-full text-light-red hover:bg-red-100" onClick={() => {
                        setComputerToDelete(computer.ID);
                        setShowModal(true);
                      }}>
                        <TbTrashX className="text-2xl" />
                      </button>
                    </Tippy>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-4 font-bold text-xl">
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex list-none'}
            activeClassName={'bg-dark-blue text-white rounded-full'}
            pageClassName={'mx-1'}
            pageLinkClassName={'block px-4 py-2'}
            previousClassName={'mx-1'}
            previousLinkClassName={'block px-4 py-2'}
            nextClassName={'mx-1'}
            nextLinkClassName={'block px-4 py-2'}
            breakClassName={'mx-1'}
            breakLinkClassName={'block px-4 py-2'}
          />
        </div>
      </section>
      <UpdateComputerModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        computerData={computerToUpdate}
      />

      <DeleteConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
      <ComputerDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        computer={computerDetails}
      />
       <CreateComputerModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />



      <footer>
        {/* Pie de página */}
      </footer>
    </div>
  );
}
