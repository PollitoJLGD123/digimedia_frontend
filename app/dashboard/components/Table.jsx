import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


export default function Table({ headers, data, onDelete, onUpdate, onShow }) {

    const router = useRouter();

    const empleadoCookie = getCookie('empleado');
    const empleadoAutenticado = empleadoCookie ? JSON.parse(empleadoCookie) : null;
    const empleadoAutenticadoId = empleadoAutenticado?.id_empleado;

    const headersList = headers.map((header) => {
        return (
            <th key={`header-${header}`} className="p-2 bg-[#8c52ff] text-white rounded-xl text-center align-middle">
                {header.toUpperCase()}
            </th>
        );
    });

    const dataList = data.map((dataRow, index) => {
        const isEmpleadoAutenticado = empleadoAutenticadoId && dataRow.id_empleado === empleadoAutenticadoId;

        const row = headers.map((header) => {
            return (
                <td key={`${dataRow.id}-${header}`} className="p-2 rounded-xl text-center align-middle">
                    {dataRow[header]}
                </td>
            );
        });

        row.push(
            <td key={`actions-${dataRow.id}`} className="rounded-xl text-center align-middle">
                {!isEmpleadoAutenticado && (
                    <button title='Mostrar Perfil' onClick={() => onShow(dataRow.id)} className="mx-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            className="w-8 text-[#8c52ff] hover:text-[#6c3dbf] transition-colors"
                        >
                            <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                            <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" />
                        </svg>
                    </button>
                )}

                {!isEmpleadoAutenticado && (
                    <button title='Editar' onClick={() => onUpdate(dataRow.id)} hidden={onUpdate == false} className="mx-1">
                        <img src="/dashboard/edit-icon.svg" className="w-8" alt="" />
                    </button>
                )}

                {isEmpleadoAutenticado && (
                    <button 
                        title='Ver Perfil' 
                        onClick={() => router.push('/dashboard/main')} 
                        className="mx-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-[#305dfe] hover:text-[#3e329a] transition-colors" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/>
                                <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21"/>
                            </g>
                        </svg>

                    </button>
                )}

                {!isEmpleadoAutenticado && (
                    <button title='Eliminar' onClick={() => onDelete(dataRow.id)} hidden={onDelete == false} className="mx-1">
                        <img src="/dashboard/trash-icon.svg" className="w-8" alt="" />
                    </button>
                )}
            </td>
        );

        return (
            <tr
                key={dataRow.id || `row-${index}`}
                className={`h-[56px] ${
                    isEmpleadoAutenticado 
                        ? "bg-[#b9d7f5]" 
                        : index % 2 === 0 ? "bg-[#f6f6f6]" : "bg-[#e5e5e5]"
                }`}
                style={isEmpleadoAutenticado ? { backgroundColor: "#b9d7f5" } : {}}
            >
                {row}
            </tr>
        );
    });

    return (
        <table className="min-w-full bg-white border-separate border-spacing-1 font-medium">
            <thead>
                <tr>
                    {headersList}
                    <th className="p-2 bg-[#8c52ff] text-white rounded-xl text-center align-middle">
                        ACCIONES
                    </th>
                </tr>
            </thead>
            <tbody>{dataList}</tbody>
        </table>
    );
}