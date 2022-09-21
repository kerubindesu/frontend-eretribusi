import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getBusinessTypes,
  deleteBusinessType,
} from "../../../features/businessTypes/businessTypesActions";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { Dialog, Table } from "../../UI/organism";
import { TabTitle } from "../../UI/atoms";

const BusinessType = () => {
  TabTitle("Jenis Dagang");

  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [q, setQuery] = useState("");

  const { businessTypes } = useSelector((state) => state.businessTypes); // payload
  const totalItems = businessTypes.totalItems;

  const fetchMoreData = () => {
    if (limit >= totalItems) {
      setHasMore(false);
    }
    setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getBusinessTypes({ limit, q }));
  }, [limit, q, dispatch]);

  useEffect(() => {
    setItems(
      businessTypes &&
        businessTypes.data.map((businessType, index) => {
          return {
            "#": index + 1,
            id: businessType._id,
            "Tipe Usaha/Jenis Dagang": businessType.name,
          };
        })
    );
  }, [businessTypes]);

  const handleDelete = (id) => {
    dispatch(setModal(true));
    setId(id);
    setMessage(`Jenis dagang yang terhapus tidak dapat dilihat lagi.`);
  };

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteBusinessType(id));
    dispatch(setModal(false));
    dispatch(getBusinessTypes({ limit, q }));
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
          title={"Jenis Dagang"}
          action={handleDelete}
          setQuery={setQuery}
        />
      </div>
      <Dialog message={message} confirm={confirm} />
    </InfiniteScroll>
  );
};

export default BusinessType;
