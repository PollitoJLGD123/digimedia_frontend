export default function Table({ headers, data, onDelete, onUpdate, onShow }) {
  const headersList = headers.map((header) => {
      return (
          <th key={`header-${header}`} className="p-2 bg-[#8c52ff] text-white rounded-xl text-center align-middle">
              {header.toUpperCase()}
          </th>
      );
  });

  const dataList = data.map((dataRow, index) => {
      const row = headers.map((header) => {
          return (
              <td key={`${dataRow.id}-${header}`} className="p-2 rounded-xl text-center align-middle">
                  {dataRow[header]}
              </td>
          );
      });

      row.push(
          <td key={`actions-${dataRow.id}`} className="rounded-xl text-center align-middle">
            
            <button onClick={() => onShow(dataRow.id)} className="mx-1">
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
              
              <button onClick={() => onUpdate(dataRow.id)} hidden={onUpdate == false} className="mx-1">
                  <img src="/dashboard/edit-icon.svg" className="w-8" alt="" />
              </button>

              <button onClick={() => onDelete(dataRow.id)} hidden={onDelete == false} className="mx-1">
                  <img src="/dashboard/trash-icon.svg" className="w-8" alt="" />
              </button>
              
          </td>
      );

      return (
          <tr
              key={dataRow.id || `row-${index}`}
              className="odd:bg-[#e5e5e5] even:bg-[#f6f6f6] h-[56px]"
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