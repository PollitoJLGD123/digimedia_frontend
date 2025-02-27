'use client';

import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import user_service from '../users/services/user.service';

const headers = [
  'id',
  'nombre',
  'apellido',
  'documento',
  'numero de documento',
  'email',
  'celular',
  'direccion',
  'distrito',
  'ciudad',
  'tipo de reclamacion',
  'servicio contratado',
  'reclamo persona',
  'aceptar terminos 1',
  'aceptar terminos 2',
  'acciones',
];

const Table = ({ headers, data, renderActions }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="p-2 border-b text-left">
              {header.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="odd:bg-[#f2f2f2]">
            {headers.map((header) => (
              <td key={header} className="p-2 border-b">
                {header === 'acciones' ? renderActions(item) : item[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DeleteButton = ({ id, onDelete }) => {
  const handleClick = () => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      onDelete(id);
    }
  };

  return (
    <button
      className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
      onClick={handleClick}
    >
      Eliminar
    </button>
  );
};

const EditButton = ({ data, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked.toString() : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-[#ffc107] px-3 py-2 rounded-md hover:bg-[#e0a800]"
        onClick={() => setShowModal(true)}
      >
        Editar
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Editar Reclamación</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Apellido"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Tipo de Documento</option>
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                  <option value="CE">CE</option>
                  <option value="PTP">PTP</option>
                  <option value="OTROS">OTROS...</option>
                </select>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  placeholder="Número de Documento"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="Celular"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  placeholder="Distrito"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  placeholder="Ciudad"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="tipoReclamo"
                  value={formData.tipoReclamo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Tipo de reclamo</option>
                  <option value="QUEJA">QUEJA</option>
                  <option value="RECLAMO">RECLAMO</option>
                </select>
                <select
                  name="servicioContratado"
                  value={formData.servicioContratado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Servicio contratado</option>
                  <option value="TECHNOLOGY">TECHNOLOGY</option>
                  <option value="OTROS">OTROS</option>
                </select>
              </div>

              <textarea
                name="reclamoPerson"
                value={formData.reclamoPerson}
                onChange={handleChange}
                placeholder="Indicar incidente"
                className="w-full p-2 border rounded h-32"
                required
              />

              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="checkReclamoForm"
                    checked={formData.checkReclamoForm === 'true'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkReclamoForm: e.target.checked.toString(),
                      })
                    }
                    className="w-4 h-4"
                    required
                  />
                  <label>Acepto términos 1</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="aceptaPoliticaPrivacidad"
                    checked={formData.aceptaPoliticaPrivacidad === 'true'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aceptaPoliticaPrivacidad: e.target.checked.toString(),
                      })
                    }
                    className="w-4 h-4"
                    required
                  />
                  <label>Acepto términos 2</label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6f4be8] text-white rounded hover:bg-[#5c40d1]"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;
  const API_URL = 'https://back.digimediamkt.com/api/reclamaciones';
  // const API_URL = "http://127.0.0.1:8000/api/reclamaciones"
  const router = useRouter();

  const transformData = (apiData) => {
    return apiData.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      apellido: item.apellido,
      documento: item.documento,
      numeroDocumento: item.numeroDocumento,
      email: item.email,
      celular: item.celular,
      direccion: item.direccion,
      distrito: item.distrito,
      ciudad: item.ciudad,
      tipoReclamo: item.tipoReclamo,
      servicioContratado: item.servicioContratado,
      reclamoPerson: item.reclamoPerson,
      checkReclamoForm: item.checkReclamoForm,
      aceptaPoliticaPrivacidad: item.aceptaPoliticaPrivacidad,
      'numero de documento': item.numeroDocumento,
      'tipo de reclamacion': item.tipoReclamo,
      'servicio contratado': item.servicioContratado,
      'reclamo persona': item.reclamoPerson,
      'aceptar terminos 1': item.checkReclamoForm === 'true' ? 'Sí' : 'No',
      'aceptar terminos 2':
        item.aceptaPoliticaPrivacidad === 'true' ? 'Sí' : 'No',
    }));
  };

  const fetchData = async (page) => {
    setLoading(true);
    await fetch(`${API_URL}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .then((data) => {
        if (data.status == 500) {
          user_service.logoutClient(router);
        } else {
          return data.json();
        }
      })
      .then((data) => {
        setData(transformData(data.data));
        setTotalItems(data.total);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .then((data) => {
        fetchData(currentPage);
      })
      .catch((err) => {
        console.error('Error eliminando:', error);
      });
  };

  useEffect(() => {
    const page = isNaN(currentPage) ? 1 : parseInt(currentPage);
    fetchData(page);
  }, [currentPage]);

  return (
    <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
      {loading && <div className="text-center p-4">Cargando...</div>}

      <Table
        headers={headers}
        data={data}
        renderActions={(rowData) => (
          <div className="flex gap-2">
            <DeleteButton id={rowData.id} onDelete={handleDelete} />
          </div>
        )}
      />

      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        currentPage={isNaN(currentPage) ? 1 : parseInt(currentPage)}
      />
    </main>
  );
}
