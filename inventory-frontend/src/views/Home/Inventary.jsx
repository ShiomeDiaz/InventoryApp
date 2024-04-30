import React, { useEffect, useState, useMemo } from 'react';
import { EndpointComputers, deleteComputer } from '../../services/endpoints/Endpoint.computer';
import { DeleteConfirmationModal} from './../../components/molecules';
import {CreateComputerModal, UpdateComputerModal, ComputerDetailsModal} from "./../../components/Modals"

import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    EndpointComputers()
      .then(computers => setComputers(computers))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async () => {
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
      <h1 className="text-xxl font-bold text-center">Inventario de Computadores</h1>
    </div>
    <div className="flex justify-between items-center mb-5">
      <button onClick={() => setShowCreateModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Nuevo Equipo
      </button>
      <input
        type="text"
        placeholder="Buscar computadores..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded"
      />
    </div>
  </div>
  
      <CreateComputerModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
  
      <section>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="border-b bg-gray-200 text-black">
              <tr>
                <th className="px-4 py-2">Identificador AF</th>
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
                <tr key={computer.ID} className="border-b">
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
                  <td className="px-4 py-2 flex justify-end items-center">
                    <Tippy content="Mas información">
                      <button className="p-1 rounded-full text-green-500 hover:bg-blue-100"onClick={() => handleMoreInfo(computer)}>
                        <FaInfoCircle className="text-2xl" />
                      </button>
                    </Tippy>
                    <Tippy content="Editar">
                      <button className="p-1 rounded-full text-blue-500 hover:bg-blue-100"onClick={() => handleEdit(computer)}>
                        <FaEdit className="text-2xl" />
                      </button>
                    </Tippy>
                    <Tippy content="Eliminar">
                      <button className="p-1 rounded-full text-red-500 hover:bg-red-100" onClick={() => {
                        setComputerToDelete(computer.ID);
                        setShowModal(true);
                      }}>
                        <FaTrash className="text-2xl" />
                      </button>
                    </Tippy>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-4">
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex list-none'}
            activeClassName={'bg-blue-500 text-white rounded-full'}
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



      <footer>
        {/* Pie de página */}
      </footer>
    </div>
  );
}
