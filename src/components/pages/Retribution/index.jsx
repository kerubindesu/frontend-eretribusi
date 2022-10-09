import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getRetributions,
  deleteRetribution,
} from "../../../features/retributions/retributionActions";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { Dialog, Table } from "../../UI/organism";
import { TabTitle } from "../../UI/atoms";

const Retribution = () => {
  TabTitle("Retribusi");

  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState("");
  const [q, setQuery] = useState("");

  const { retributions } = useSelector((state) => state.retributions); // payload
  const totalItems = retributions.totalItems;

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getRetributions({ limit, q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(
      retributions &&
      retributions.data.map((retribution, index) => {
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
  }, [retributions]);

  const handleDelete = (id) => {
    dispatch(setModal(true));
    setId(id);
    setMessage(
      "Retribusi yang terhapus tidak dapat dilihat lagi. Akun yang terhubung juga akan terhapus."
    );
  };

  // Delete Retribution
  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteRetribution(id));
    dispatch(setModal(false));
    dispatch(getRetributions({ limit, q }));
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
      >
        <div className="flex flex-col gap-4">
          <Table
            items={items}
            totalItems={totalItems}
            title={"Retribusi"}
            action={handleDelete}
            setQuery={setQuery}
          />
        </div>
      </InfiniteScroll>
      <Dialog message={message} confirm={confirm} />
    </div>
  );
};

export default Retribution;
