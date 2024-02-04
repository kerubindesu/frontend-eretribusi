import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getStalls, deleteStall } from "../../../features/stalls/stallActions";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { Dialog, Table } from "../../UI/organism";
import { TabTitle } from "../../UI/atoms";

const Stall = () => {
  TabTitle("Kios/Los");

  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState("");
  const [q, setQuery] = useState([]);

  const { stalls } = useSelector((state) => state.stalls); // payload
  const totalItems = stalls.totalItems;

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getStalls({ limit, q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(
      stalls &&
      stalls?.data?.map((stall, index) => {
        return {
          "#": index + 1,
          id: stall._id,
          Tipe: stall.type.toUpperCase(),
          Kode: stall.name,
          Luas: stall.size,
          "Biaya Tempat": `Rp ${stall.stall_cost}`,
          "Biaya Sampah": `Rp ${stall.waste_cost} ${stall.type === "kios" ? "(1 Bulan)" : ""
            }`,
        };
      })
    );
  }, [stalls]);

  const handleDelete = (id) => {
    dispatch(setModal(true));
    setId(id);
    setMessage(`Los/Kios yang terhapus tidak dapat dilihat lagi.`);
  };

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteStall(id));
    dispatch(setModal(false));
    dispatch(getStalls({ limit, q }));
  };

  return (
    <div className="flex-1 relative">
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
        className="min-h-[64vh] relative"
      >
        <div className="relative flex flex-col gap-4">
          <Table
            items={items}
            totalItems={totalItems}
            title={"Kios/Los"}
            action={handleDelete}
            setQuery={setQuery}
          />
        </div>
      </InfiniteScroll>
      <Dialog message={message} confirm={confirm} />
    </div>
  );
};

export default Stall;
