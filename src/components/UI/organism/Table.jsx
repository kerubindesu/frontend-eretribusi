import React, { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import GlobalFilter from "./GlobalFilter";

const Table = ({ tableData }) => {
  const data = useMemo(() => [...tableData], [tableData]);

  const columns = useMemo(
    () =>
      tableData[0]
        ? Object.keys(tableData[0]).map((key) => {
            return { Header: key, accessor: key };
          })
        : [],
    [tableData]
  );

  const initialState = { hiddenColumns: ["id"] };

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,

    preGlobalFilteredRows,

    setGlobalFilter,

    state,
  } = useTable({ columns, data, initialState }, useGlobalFilter, useSortBy);

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <div className="overflow-x-auto relative">
        <table
          {...getTableProps()}
          className="w-full text-left text-gray-500 dark:text-gray-400 whitespace-nowrap"
        >
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    scope="col"
                    className="py-3 px-6"
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▾" : " ▴") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="py-4 px-6">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
