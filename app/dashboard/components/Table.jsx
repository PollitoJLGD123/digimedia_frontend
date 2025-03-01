export default function Table({ headers, data, onDelete, onUpdate }) {
  const headersList = headers.map((header, index) => {
    return (
      <th key={index} className="p-2 bg-[#8c52ff] text-white rounded-xl">
        {header.toUpperCase()}
      </th>
    );
  });

  const dataList = data.map((dataRow) => {
    const row = [];

    for (let i = 0; i < headers.length; i++) {
      row.push(
        <td key={i} className="p-2 rounded-xl">
          {dataRow[headers[i]]}
        </td>
      );
    }
    row.push(
      <td key={50} className="rounded-xl text-center">
        <button onClick={() => onDelete(dataRow.id)} hidden={onDelete == false}>
          <img src="/dashboard/trash-icon.svg" className="w-8" alt="" />
        </button>
        <button onClick={() => onUpdate(dataRow.id)} hidden={onUpdate == false}>
          <img src="/dashboard/edit-icon.svg" className="w-8" alt="" />
        </button>
      </td>
    );

    return (
      <tr
        key={dataRow.id}
        className="odd:bg-[#e5e5e5] even:bg-[#f6f6f6] h-[56px]"
      >
        {row}
      </tr>
    );
  });

  return (
    <table className="min-w-full bg-white border-separate border-spacing-1 font-medium">
      <thead>
        <tr>{headersList}</tr>
      </thead>
      <tbody>{dataList}</tbody>
    </table>
  );
}