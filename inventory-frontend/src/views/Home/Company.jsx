import React, { useEffect, useState, useMemo } from 'react';
import { fetchCompanies, deleteCompany, updateCompany, createCompany } from '../../services/endpoints/Endpoint.company';
import { CreateCompanyModal, UpdateCompanyModal, CompanyDetailsModal } from '../../components/Modals';
import { useAuth } from '../../context';
import { DeleteConfirmationModal} from './../../components/molecules';
import { FaPlusCircle, FaInfoCircle } from 'react-icons/fa';
import { TbTrashX } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactPaginate from 'react-paginate';

export function CompanyInventory() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [companyToUpdate, setCompanyToUpdate] = useState({});
  const [companyDetails, setCompanyDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { isUserAdmin } = useAuth();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCompanies()
      .then(setCompanies)
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async () => {
    if (!isUserAdmin()) {
      console.error('Unauthorized: User does not have permission to delete companies');
      alert('No autorizado: Solo los administradores pueden eliminar empresas.');
      return;
    }

    try {
      const success = await deleteCompany(companyToDelete);
      if (success) {
        setCompanies(prev => prev.filter(company => company.ID !== companyToDelete));
        console.log("Company deleted successfully");
      }
    } catch (error) {
      console.error('Failed to delete company:', error);
    } finally {
      setShowModal(false);
      setCompanyToDelete(null);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

//   const handleSortChange = (field) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortOrder('asc');
//     }
//   };

  const handleEdit = (company) => {
    if (company) {
      setCompanyToUpdate(company);
      setShowUpdateModal(true);
    } else {
      console.error("No se proporcionaron datos de la empresa para la actualización.");
      // Manejar este caso de error como consideres necesario
    }
  };

  const handleMoreInfo = (company) => {
    console.log("edit");
    // setCompanyDetails(company);
    // setShowDetailsModal(true);
  };

  const sortedAndFilteredCompanies = useMemo(() => {
    return companies.filter(company =>
      Object.values(company).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [companies, searchTerm, sortField, sortOrder]);

  const pageCount = Math.ceil(sortedAndFilteredCompanies.length / itemsPerPage);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentItems = sortedAndFilteredCompanies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="p-5">
      <div className="flex flex-col">
        <div className="mb-4">
          <h1 className="text-xxl text-gray-700 font-bold font-roboto text-center">Empresas Vinculadas</h1>
        </div>
        <div className="flex justify-between items-center mb-5">
        <button onClick={() => setShowCreateModal(true)} className=" flex flex-row justify-between bg-dark-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow-md sm:rounded-lg">
      Nuevo
        <FaPlusCircle className="pl-1 mt-0.5 text-xl" />
      </button>
          <input
            type="text"
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded shadow-md sm:rounded-lg"
          />
        </div>
      </div>
      <section>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-left bg-white text-sm rtl:text-right">
            <thead className="border-b bg-dark-blue text-white font-bold uppercase text-x justify-center items-center">
              <tr>
              <th className="px-6 py-3">NIT</th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Teléfono</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Website</th>
                <th className="px-6 py-3">Direccion</th>
                <th className="px-6 py-3">Codigo Postal</th>
                <th className="px-6 py-3">Ciudad</th>
                <th className="px-6 py-3">País</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(company => (
                <tr key={company.ID} className="border-b text-gray-800 font-semibold">
                  <td className="px-6 py-4">{company.NIT}</td>
                  <td className="px-6 py-4">{company.Name}</td>
                  <td className="px-6 py-4">{company.Phone}</td>
                  <td className="px-6 py-4">{company.Email}</td>
                  <td className="px-6 py-4">{company.Website}</td>
                  <td className="px-6 py-4">{company.Address}</td>
                  <td className="px-6 py-4">{company.PostalCode}</td>
                  <td className="px-6 py-4">{company.City}</td>
                  <td className="px-6 py-4">{company.Country}</td>
                  <td className="px-4 py-2 flex justify-start items-center">
                    <Tippy content="Edit">
                      <button className="p-1 rounded-full text-dark-blue hover:bg-blue-100" onClick={() => handleEdit(company)}
                      ><RiEdit2Line className="text-2xl" />
                      </button>
                    </Tippy>
                    <Tippy content="Delete">
                      <button className="p-1 rounded-full text-light-red hover:bg-red-100" onClick={() => {
                        setCompanyToDelete(company.ID);
                        setShowModal(true);
                      }}><TbTrashX className="text-2xl" />
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

      <DeleteConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        onSuccess={() => {
          fetchCompanies().then(setCompanies); // Recarga las empresas después de actualizar una
        }}
        
      />
      <CreateCompanyModal
       isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          fetchCompanies().then(setCompanies); // Recarga las empresas después de crear una nueva
        }}
        />
      <UpdateCompanyModal 
      isOpen={showUpdateModal} 
      onClose={() => setShowUpdateModal(false)} 
      companyData={companyToUpdate} 
      onSuccess={() => {
        fetchCompanies().then(setCompanies); // Recarga las empresas después de actualizar una
      }}
      />

    </div>
  );
}
