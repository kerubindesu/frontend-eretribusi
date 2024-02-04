import { Spinner } from "flowbite-react";
import React, { useEffect, useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { getInfoBill } from "../../../features/bills/billActions";
import { Heading, TabTitle } from "../../UI/atoms";
import { InputSearch } from "../../UI/molecules";

const DetailBill = () => {
  TabTitle("Info Tagihan");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [q, setQuery] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState("");

  const { info } = useSelector((state) => state.bills);
  const totalItems = info.totalItems;

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    id && dispatch(getInfoBill({ id, limit, q }));
  }, [id, limit, q, dispatch]);

  useEffect(() => {
    setItems(
      info &&
        info?.retributions?.map((retribution, index) => {
          return {
            "#": index + 1,
            id: retribution._id,
            Tipe: retribution.stall ? retribution.stall.type.toUpperCase() : "",
            Nomor: retribution.stall ? retribution.stall.name : "",
            Luas: retribution.stall ? retribution.stall.size : "",
            Nama: retribution.user.name,
            "Jenis Dagang": retribution.user.business_type,
            Alamat: retribution.user.address,
          };
        })
    );
  }, [info]);

  const data = useMemo(() => [...items], [items]);

  const columns = useMemo(
    () =>
      items[0]
        ? Object.keys(items[0]).map((key) => {
            if (key === "ID Tagihan")
              if (key === "#")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => (
                    <>
                      <div className="text-center">{value}</div>
                    </>
                  ),
                };

            return { Header: key, accessor: key };
          })
        : [],
    [items]
  );

  const initialState = { hiddenColumns: ["id"] };

  const tableInstance = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = tableInstance;

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-8 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Heading text={document.title} variant={"text-xl"} />
          <InputSearch
            onChange={(e) => setQuery(e.target.value)}
            placeholder={"Ketik sesuatu ..."}
          />
        </div>

        <section className="mb-4 max-w-sm text-xs">
          <div className="border-l-2 border-sky-500 p-2 flex gap-2">
            <span className="w-24 box-border overflow-hidden whitespace-nowrap">
              ID Tagihan
            </span>
            <span className="font-bold text-sky-500">
              #{info?.bill?.q_bill}
            </span>
          </div>
          <div className="border-l-2 p-2 flex gap-2">
            <span className="w-24 box-border overflow-hidden whitespace-nowrap">
              Tenggat Waktu
            </span>
            <span>
              {new Date(info?.bill?.due_date).toLocaleString("id-id", {
                dateStyle: "full",
              })}
            </span>
          </div>
          <div className="border-l-2 p-2 border-yellow-300 flex items-center gap-2">
            <span className="w-24 box-border overflow-hidden whitespace-nowrap">
              Status
            </span>
            <span className="p-1 bg-yellow-300/30 rounded text-gray-700 font-semibold">
              Belum membayar
            </span>
          </div>
        </section>
        {info?.retributions?.length <= 0 && (
          <span className="m-auto text-lg text-sky-700 font-semibold">
            Oops, tidak menemukan apa pun di sini!
          </span>
        )}

        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <span className="py-4 flex justify-center items-center text-sm text-sky-400 gap-2">
              <Spinner size={"sm"} />
              Memuat data...
            </span>
          }
        >
          <div className="mt-2 overflow-x-auto relative flex flex-col">
            <table
              {...getTableProps()}
              className="w-full text-left text-gray-500 whitespace-nowrap"
            >
              <thead className="text-xs text-gray-700 bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="border text-center"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className="py-3 px-2"
                      >
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ▾"
                            : " ▴"
                          : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <tr {...row.getRowProps()}>
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
        </InfiniteScroll>
      </div>
    </>
  );
};

export default DetailBill;
