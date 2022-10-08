import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBills, deleteBill } from "../../../features/bills/billActions";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { Dialog, Table } from "../../UI/organism";
import { TabTitle } from "../../UI/atoms";

const AdminBill = () => {
  TabTitle("Tagihan");

  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState("");
  const [q, setQuery] = useState([]);

  const { bills } = useSelector((state) => state.bills); // payload
  const totalItems = bills.totalItems;

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getBills({ limit, q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(
      bills &&
        bills.data.map((bill, index) => {
          return {
            "#": index + 1,
            id: bill._id,
            "ID Tagihan": bill.q_bill,
            Tipe: bill.stall_type.toUpperCase(),
            "Tenggat Waktu": new Date(bill.due_date).toLocaleDateString(),
          };
        })
    );
  }, [bills]);

  const handleDelete = (id) => {
    dispatch(setModal(true));
    setId(id);
    setMessage(`Los/Kios yang terhapus tidak dapat dilihat lagi.`);
  };

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteBill(id));
    dispatch(setModal(false));
    dispatch(getBills({ limit, q }));
  };

  return (
    <div className="flex-1 relative">
      {items && items.length <= 0 && (
        <span className="absolute inset-0 flex justify-center items-center -z-10 text-lg text-sky-700 font-semibold">
          Oops, tidak menemukan apapun di sini!
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
        <div className="relative flex flex-col gap-4">
          <Table
            items={items}
            totalItems={totalItems}
            title={"Tagihan"}
            action={handleDelete}
            setQuery={setQuery}
          />
        </div>
      </InfiniteScroll>
      <Dialog message={message} confirm={confirm} />
    </div>
  );
};

export default AdminBill;
