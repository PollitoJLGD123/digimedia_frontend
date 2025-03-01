export default function Table({ headers, data, onDelete, onUpdate }) {
  const headersList = headers.map((header, index) => {
    return (
      <th key={index} className="p-2">
        {header.toUpperCase()}
      </th>
    );
  });

  const dataList = data.map((dataRow) => {
    const row = [];

    for (let i = 0; i < headers.length; i++) {
      row.push(
        <td key={i} className="p-2">
          {dataRow[headers[i]]}
        </td>
      );
    }
    row.push(
      <td key={50}>
        <button 
          className="bg-[#dc3545] text-white rounded-md px-3 py-2 m-2"
          onClick={() => onDelete(dataRow.id)}
          hidden={onDelete == false}
        >
          Eliminar
        </button>
        <button 
          className="bg-[#ffc107] rounded-md px-3 py-2 m-2"
          onClick={() => onUpdate(dataRow.id)}
          hidden={onUpdate == false}
        >
          Editar
        </button>
      </td>
    );

    return (
      <tr key={dataRow.id} className="odd:bg-[#f2f2f2] h-[56px]">
        {row}
      </tr>
    );
  });

  return (
    <table className="min-w-full bg-white ">
      <thead>
        <tr>
          {headersList}
        </tr>
      </thead>
      <tbody>
        {dataList}
      </tbody>
    </table>
  );
}