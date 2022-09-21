import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getRoles, deleteRole } from "../../../features/roles/rolesActions";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { Dialog, Table } from "../../UI/organism";
import { TabTitle } from "../../UI/atoms";

const Role = () => {
  TabTitle("Role Pengguna");

  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [q, setQuery] = useState([]);

  const { roles } = useSelector((state) => state.roles); // payload
  const totalItems = roles.totalItems;

  const fetchMoreData = () => {
    if (limit >= totalItems) {
      setHasMore(false);
    }
    setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getRoles({ limit, q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(
      roles &&
        roles.data.map((role, index) => {
          return {
            "#": index + 1,
            id: role._id,
            "Nama Role": role.name,
          };
        })
    );
  }, [roles]);

  const handleDelete = (id) => {
    dispatch(setModal(true));
    setId(id);
    setMessage(`Role yang terhapus tidak dapat dilihat lagi.`);
  };

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteRole(id));
    dispatch(setModal(false));
    dispatch(getRoles({ limit, q }));
  };

  return (
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
          title={"Role Pengguna"}
          action={handleDelete}
          setQuery={setQuery}
        />
      </div>
      <Dialog message={message} confirm={confirm} />
    </InfiniteScroll>
  );
};

export default Role;
