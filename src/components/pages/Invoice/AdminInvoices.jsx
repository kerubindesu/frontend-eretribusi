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

  const dispatch = useDispatch();

  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [q, setQuery] = useState("");
  const [items, setItems] = useState("");

  const { invoices } = useSelector((state) => state.invoices);
  const totalItems = invoices.totalItems;

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getInvoices({ limit, q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(invoices && invoices.data);
  }, [invoices]);

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
        {items &&
          items.map((item, index) => (
            <Link key={index + 1} className="" to={`${item._id}`}>
              <div className="border mb-4 p-4 w-full shadow-sm hover:shadow bg-white rounded flex justify-between items-center gap-4 md:gap-16 text-xs">
                <div className="flex-1 flex flex-col md:flex-row gap-y-4 gap-x-2 justify-center md:justify-between items-start md:items-center">
                  <Field
                    text={item.order_id}
                    variant={"w-[8.9rem] font-bold"}
                  />
                  <Field text={item.transaction_time} variant={"w-[8rem]"} />
                  <Field text={item.name} variant={"w-[8rem] font-bold"} />
                </div>
                <div className="flex-1 max-w-xs flex flex-col md:flex-row gap-y-4 gap-x-2 justify-center md:justify-between items-end md:items-center text-end md:text-start">
                  <Field
                    text={item && item.payment_type.toUpperCase()}
                    variant={"p-1 w-[5rem] border rounded text-center"}
                  />
                  <Field
                    text={`Rp ${item.total_price}`}
                    variant={"w-[4.2rem] font-bold"}
                  />
                  <Field
                    text={`${
                      item.transaction_status === "settlement"
                        ? "Paid"
                        : "Pending"
                    }`}
                    variant={`py-1 px-2 w-[5rem] rounded font-bold text-center ${
                      item.transaction_status === "settlement"
                        ? "bg-green-100 text-green-500"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  />
                </div>
              </div>
            </Link>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default AdminInvoices;
