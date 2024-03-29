import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "flowbite-react/lib/esm/components";
import { Dialog, Table } from "../../UI/organism";
import { TabTitle } from "../../UI/atoms";
import { getUsers, deleteUser } from "../../../features/users/userActions";
import { setModal } from "../../../features/modal/modalSlice";

const User = () => {
  TabTitle("Pengguna");

  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState("");
  const [q, setQuery] = useState("");

  const { users } = useSelector((state) => state.users); // payload
  const totalItems = users.totalItems;

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getUsers({ limit: limit, q: q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(
      users &&
        users.data.map((user, index) => {
          return {
            "#": index + 1,
            id: user._id,
            Username: user.username,
            Nama: user.name,
            "Jenis Dagang": user.business_type,
            Alamat: user.address,
          };
        })
    );
  }, [users]);

  const handleDelete = (id) => {
    dispatch(setModal(true));
    setId(id);
    setMessage(
      `User yang terhapus tidak dapat di lihat lagi. Retribusi yang terhubung juga akan terhapus.`
    );
  };

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
    dispatch(setModal(false));
    dispatch(getUsers({ limit, q }));
  };

  return (
    <div className="flex-1 relative">
      {items && items.length <= 0 && (
        <span className="absolute inset-0 flex justify-center items-center -z-10 text-lg text-sky-700 font-semibold">
          Oops, tidak menemukan apa pun di sini!adasda
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
            title={"Pengguna"}
            action={handleDelete}
            setQuery={setQuery}
          />
        </div>
      </InfiniteScroll>
      <Dialog message={message} confirm={confirm} />
    </div>
  );
};

export default User;
