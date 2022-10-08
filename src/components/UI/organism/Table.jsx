import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import { GlobalFilter } from "../../../config";
import { Button, Heading } from "../atoms";
import { MdOutlineDataSaverOn } from "react-icons/md";

const Table = ({ items, title, action, setQuery }) => {
  const data = useMemo(() => [...items], [items]);

  const columns = useMemo(
    () =>
      items[0]
        ? Object.keys(items[0]).map((key) => {
            if (key === "Luas")
              return {
                Header: () => (
                  <>
                    {key} (m <sup>2</sup>)
                  </>
                ),
                accessor: key,
                Cell: ({ value }) => (
                  <>
                    <div className="text-right">{value}</div>
                  </>
                ),
              };
            if (key === "#" || key === "Tenggat Waktu")
              return {
                Header: key,
                accessor: key,
                Cell: ({ value }) => (
                  <>
                    <div className="text-center">{value}</div>
                  </>
                ),
              };
            if (key === "ID Tagihan")
              return {
                Header: key,
                accessor: key,
                Cell: ({ row, value }) => (
                  <>
                    <Link to={`${row.values.id}`}>
                      <div className="text-right font-semibold text-sky-400 underline">
                        {value}
                      </div>
                    </Link>
                  </>
                ),
              };

            return { Header: key, accessor: key };
          })
        : [],
    [items]
  );

  const initialState = { hiddenColumns: ["id"] };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "",
        Cell: ({ row }) => (
          <div className="flex justify-center items-center gap-2">
            <Link to={`${row.values.id}/edit`}>
              <span className="text-sky-500 underline">Edit</span>
            </Link>
            <button
              value={row.values.id}
              onClick={(e) => action(e.target.value)}
              className="text-red-500 underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,

    preGlobalFilteredRows,

    setGlobalFilter,

    state,
  } = tableInstance;

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full flex flex-col items-start justify-center">
          <Heading text={title} variant={"text-xl"} />
        </div>
        <div className="w-full flex flex-row-reverse gap-4 justify-between items-center">
          <Link className={`${title === "Pengguna" && "hidden"}`} to="add">
            <Button
              variant={"bg-sky-400 hover:bg-sky-500 rounded text-white"}
              text={title}
              icon={<MdOutlineDataSaverOn />}
            />
          </Link>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={state.globalFilter}
            setQuery={setQuery}
          />
        </div>
      </div>
      <div className="mt-2 overflow-x-auto relative flex flex-col">
        <table
          {...getTableProps()}
          className="w-full text-left text-gray-500 whitespace-nowrap border"
        >
          <thead className="text-xs text-gray-700">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-center"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    scope="col"
                    className="py-3 px-2"
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
                <tr {...row.getRowProps()} className="border-y">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="p-4 max-w-[16rem] text-ellipsis overflow-hidden border"
                      >
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
