'use client';

import { useSearchParams } from 'next/navigation';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import Modal_usuario from './components/Modal_usuario';
import user_service from './services/user.service';
import { useRouter } from 'next/navigation';

const headers = ['id', 'name', 'email', 'created_at'];

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [dataUpd, setdataUpdate] = useState(false);
  const router = useRouter();

  async function setProducts(page) {
    await user_service
      .userByPage(page)
      .then((data) => {
        if (data.status == 500) {
          user_service.logoutClient(router);
        } else {
          return data.json();
        }
      })
      .then((data) => {
        if (parseInt(data.status) == 200) {
          if (data.total > 0) {
            data.data.map((data) => {
              const fecha = new Date(data.created_at);

              data.created_at = fecha.toLocaleDateString('es-ES');
            });

            setData(data.data);
            setCount(data.total);
          }
        } else {
          setError(true);
          setLoading(false);
        }
      });
  }

  function onDelete(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    user_service
      .delete(id)
      .then((data) => {
        if (data.status == 500) {
          user_service.logoutClient(router);
        } else {
          return data.json();
        }
      })
      .then((data) => {
        fetchProducts();
      });
  }

  function onUpdate(idUpdate) {
    setdataUpdate(data.find((r) => r.id == idUpdate));
    setModal(true);
  }

  const fetchProducts = async () => {
    if (isNaN(currentPage)) {
      await setProducts(1);
      return;
    }

    await setProducts(parseInt(currentPage));
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // Re-ejecutar cuando cambia la query

  return (
    <>
      <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
        <button
          className="bg-blue-600 text-white p-2 rounded-md mb-4 font-bold"
          onClick={() => {
            setModal(true);
          }}
        >
          {' '}
          Crear{' '}
        </button>
        <Table
          headers={headers}
          data={data}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
        <Pagination count={count} />
        <Modal_usuario
          isVisible={modal}
          data={dataUpd}
          onclose={() => {
            setModal(false);
            setdataUpdate(false);
            fetchProducts();
          }}
        />
      </main>
    </>
  );
}
