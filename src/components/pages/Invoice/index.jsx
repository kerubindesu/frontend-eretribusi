import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices } from "../../../features/invoices/invoicesActions";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react/lib/esm/components";
import { FcNext } from "react-icons/fc";
import { TabTitle, Heading, Input } from "../../UI/atoms";
import { InputSearch } from "../../UI/molecules";
import InfiniteScroll from "react-infinite-scroll-component";

const Invoice = () => {
  TabTitle("Invoices");

  const dispatch = useDispatch();

  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [q, setQuery] = useState("");

  const { invoices } = useSelector((state) => state.invoices); // payload
  const totalItems = invoices.totalItems;

  useEffect(() => {
    if (limit >= totalItems) {
      setHasMore(false);
    }
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getInvoices({ limit, q }));
  }, [limit, q, dispatch]);

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full flex items-center justify-between">
          <Heading text={document.title} variant={"text-xl"} />
          <Input
            onChange={(e) => setQuery(e.target.value)}
            type={"date"}
            variant={"rounded"}
          />
        </div>
        <InputSearch
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"Ketik sesuatu ..."}
        />
      </div>
      <InfiniteScroll
        dataLength={invoices && invoices.data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <span className="py-4 flex justify-center items-center text-sm text-sky-400 gap-2">
            <Spinner size={"sm"} />
            Memuat data...
          </span>
        }
      >
        <section className="my-4 p-4 min-h-full bg-sky-50 rounded overflow-x-auto relative flex flex-col gap-4">
          {invoices && invoices.data.length <= 0 && (
            <span className="m-auto text-lg text-sky-700 font-semibold">
              Oops, Data yang anda cari tidak ditemukan!
            </span>
          )}
          {invoices &&
            invoices.data.map((invoice, index) => (
              <Link
                key={index + 1}
                className="rounded shadow hover:shadow-sm"
                to={`${invoice._id}/detail`}
              >
                <div className="p-4 w-max md:w-full bg-white rounded flex justify-around items-center gap-4 whitespace-nowrap relative text-xs">
                  <span className="min-w-[8rem] max-w-[8rem] text-ellipsis overflow-hidden whitespace-nowrap font-bold">
                    #{invoice.order_id}
                  </span>
                  <span className="min-w-[8rem] max-w-[8rem] text-ellipsis overflow-hidden whitespace-nowrap">
                    {invoice.transaction_time && invoice.transaction_time}
                  </span>
                  <span className="min-w-[3.5rem] max-w-[3.5rem] text-ellipsis overflow-hidden whitespace-nowrap">
                    {invoice.stall_name}
                  </span>
                  <span className="min-w-[8rem] max-w-[8rem] text-ellipsis overflow-hidden whitespace-nowrap">
                    {invoice.name}
                  </span>
                  <span className="min-w-[6rem] max-w-[6rem] text-ellipsis overflow-hidden whitespace-nowrap font-bold text-end">
                    Rp {invoice.total_price}
                  </span>
                  <span
                    className={`p-2 min-w-[4rem] max-w-[4rem] rounded text-ellipsis overflow-hidden whitespace-nowrap text-center font-semibold ${
                      invoice.transaction_status === "settlement"
                        ? "bg-green-100 text-green-500"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    {invoice.transaction_status === "settlement"
                      ? "Paid"
                      : "Pending"}
                  </span>
                  <FcNext className="text-lg" />
                </div>
              </Link>
            ))}
        </section>
      </InfiniteScroll>
    </div>
  );
};

export default Invoice;
