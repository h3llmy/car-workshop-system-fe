import React from "react";

const getValue = (obj, path) =>
  path.split(".").reduce((acc, part) => acc?.[part], obj);

export const Table = ({ columns = [], data = [], renderAction }) => {
  const totalColumns = columns.length + (renderAction ? 1 : 0);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3">
                {col.label}
              </th>
            ))}
            {renderAction && <th className="px-6 py-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={totalColumns}
                className="text-center text-red-600 px-6 py-4 bg-slate-800"
              >
                Data not found
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((col, colIndex) => {
                  const rawValue = getValue(row, col.key);
                  const displayValue = col.transform
                    ? col.transform(rawValue, row)
                    : rawValue;

                  return (
                    <td key={colIndex} className="px-6 py-4">
                      {displayValue}
                    </td>
                  );
                })}
                {renderAction && (
                  <td className="px-6 py-4">{renderAction(row, rowIndex)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
