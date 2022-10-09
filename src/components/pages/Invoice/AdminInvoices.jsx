import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices } from "../../../features/invoices/invoiceActions";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react/lib/esm/components";
import { TabTitle, Heading, Input, Field } from "../../UI/atoms";
import { InputSearch } from "../../UI/molecules";
import InfiniteScroll from "react-infinite-scroll-component";

const AdminInvoices = () => {
  TabTitle("Invoices");

  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [q, setQuery] = useState("");
  const [items, setItems] = useState("");

  // ambil data invoices dari global state
  const { invoices } = useSelector((state) => state.invoices);
  const totalItems = invoices.totalItems;

  // Dispatch
  const dispatch = useDispatch();
  // dispatch invoices
  useEffect(() => {
    dispatch(getInvoices({ limit, q }));
  }, [limit, q, dispatch]);

  // isi items, ambil dari invoices
  useEffect(() => {
    setItems(invoices && invoices.data);
  }, [invoices]);

  // Infinite scroll
  // tambah limit jika limit masih kurang dari totalItems
  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };
  // set false hasMore jika limit sudah mencapai totalItems
  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  return (
    <div className="flex-1 relative flex flex-col">
      <div className="mb-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
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
      {items && items.length <= 0 && (
        <span className="absolute inset-0 flex justify-center items-center -z-10 text-lg text-sky-700 font-semibold">
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
        <section className="flex flex-col gap-2">
          {items &&
            items.map((item, index) => (
              <Link key={index + 1} to={`${item._id}`}>
                <div className="p-4 w-full flex justify-around items-center gap-8 bg-white border rounded">
                  <section className="flex-1 flex flex-col sm:flex-row sm:justify-around items-start sm:items-center gap-2 text-slate-800">
                    <Field
                      text={item.order_id}
                      variant={"w-32 text-xs font-bold"}
                    />
                    <Field text={item.name} variant={"w-32 font-bold"} />
                    <Field text={item.transaction_time} variant={"text-xs"} />
                  </section>
                  <section className="flex-1 flex flex-col sm:flex-row sm:justify-between items-end sm:items-center gap-2">
                    <Field
                      text={`Rp ${item.total_price}`}
                      variant={"w-20 font-semibold text-center sm:text-start"}
                    />
                    <Field
                      text={`${item.transaction_status === "settlement"
                        ? "Paid"
                        : "Pending"
                        }`}
                      variant={`py-1 px-2 w-[5rem] border rounded-sm font-bold text-center ${item.transaction_status === "settlement"
                        ? "bg-green-100 text-green-500 border-green-500"
                        : "bg-orange-100 text-orange-500 border-orange-500"
                        }`}
                    />
                  </section>
                </div>
              </Link>
            ))}
        </section>
      </InfiniteScroll>
    </div>
  );
};

export default AdminInvoices;
