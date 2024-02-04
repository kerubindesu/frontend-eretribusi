import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRetribution } from "../../../features/retributions/retributionActions";
import { getUserBills } from "../../../features/bills/billActions";
import { chargeInvoice } from "../../../features/invoices/invoiceActions";
import { Button, Field, Heading, Input, TabTitle } from "../../UI/atoms";
import { FloatingLabel, InputSearch } from "../../UI/molecules";
import { Alert } from "../../UI/organism";
import Select from "react-select";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import InfiniteScroll from "react-infinite-scroll-component";

const UserBill = () => {
  TabTitle("Tagihan");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState("")
  const [finalDate, setFinalDate] = useState("");
  const [rID, setRId] = useState("");
  const [bID, setBId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [stallName, setStallName] = useState("");
  const [stallCost, setStallCost] = useState("");
  const [wasteCost, setWasteCost] = useState("");
  const [priceAmount, setPriceAmount] = useState("");

  const [q, setQuery] = useState("");
  const [limit, setLimit] = useState(32);
  const [hasMore, setHasMore] = useState(true);

  const [drawer, setDrawer] = useState(false);
  const [tagar, setTagar] = useState("");
  const [errMessage, setErrMessage] = useState("");

  if (drawer) {
    disableBodyScroll(document);
  } else {
    enableBodyScroll(document);
  }

  const { retribution } = useSelector((state) => state.retributions); // payload retribution
  const { bills } = useSelector((state) => state.bills); // payload tagihan
  const totalItems = bills.totalItems;
  const { isError, chargeLoading } = useSelector((state) => state.invoices); // charge invoice

  useEffect(() => {
    if (limit >= totalItems) return setHasMore(false);
  }, [limit, totalItems]);

  const fetchMoreData = () => {
    if (limit <= totalItems) return setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(getUserRetribution());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserBills({ q, limit }));
  }, [q, limit, dispatch]);

  useEffect(() => {
    setItems(bills && bills.data);
  }, [bills]);

  useEffect(() => {
    if (retribution && retribution.stall.type === "kios") {
      setStallCost(finalDate * parseInt(retribution.stall.stall_cost));

      const amount =
        finalDate * parseInt(retribution.stall.stall_cost) +
        parseInt(retribution.stall.waste_cost);
      setPriceAmount(amount);
    }
    if (retribution && retribution.stall.type === "los") {
      setStallCost(parseInt(retribution.stall.stall_cost));
      const amount =
        parseInt(retribution.stall.stall_cost) +
        parseInt(retribution.stall.waste_cost);
      setPriceAmount(amount);
    }
  }, [retribution, finalDate, stallCost]);

  useEffect(() => {
    isError && setErrMessage(isError);
  }, [isError]);

  const paymentOptions = [
    { value: "gopay", label: "GoPay" },
    { value: "shopeepay", label: "ShopeePay" },
    { value: "bca", label: "VA BCA" },
    { value: "bni", label: "VA BNI" },
    { value: "bri", label: "VA BRI" },
    { value: "permata", label: "VA Permata" },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setRId(retribution._id);
    setName(retribution.user.name);
    setStallName(retribution.stall.name);
    setWasteCost(retribution.stall.waste_cost);
  };

  const charge = {
    retribution_id: rID,
    bill_id: bID,
    stall_cost: stallCost,
    waste_cost: wasteCost,
    total_price: priceAmount,
    payment_type: paymentMethod,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      chargeInvoice({
        charge,
        navigate,
      })
    );
  };

  return (
    <>
      <div className="flex-1 relative flex flex-col">
        {items && items.length <= 0 && (
          <span className="absolute inset-0 flex justify-center items-center -z-10 text-lg text-sky-700 font-semibold">
            Oops, tidak menemukan apa pun di sini!
          </span>
        )}
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
          <section className="py-4 flex flex-col gap-2">
            {items &&
              items.map((item, index) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(e);
                    setBId(item._id);
                    setFinalDate(new Date(item.due_date).getDate());
                    setTagar(item.q_bill);
                    setDrawer(true);
                  }}
                  key={index + 1}
                  className="border p-4 w-full shadow-sm hover:shadow bg-white rounded flex justify-between items-center gap-4 text-xs cursor-pointer"
                  to={`${item._id}/detail`}
                >
                  <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
                    <Field
                      text={`#${item.q_bill}`}
                      variant={"w-[4rem] text-start font-bold"}
                    />
                    <Field
                      text={`${item.stall_type.toUpperCase()} ${retribution && retribution.stall.name
                        }`}
                      variant={"w-[4rem] text-start"}
                    />
                    <Field
                      text={`${new Date(item.due_date).toLocaleString("id-id", {
                        dateStyle: "full",
                      })}`}
                      variant={"w-[10rem] font-semibold"}
                    />
                  </div>
                  <div className="">
                    <div className="py-2 px-4 rounded bg-sky-400 flex justify-center items-center w-max text-white font-bold">
                      Bayar
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </InfiniteScroll>
      </div>

      {/* Drawer */}
      <div
        className={`${drawer ? "block" : "hidden"
          } fixed top-0 bottom-0 right-0 bg-white w-[20rem] z-20 p-4 shadow-lg flex flex-col justify-start items-start gap-4 overflow-y-auto`}
      >
        <div className="mb-8 w-full flex justify-start items-center gap-2">
          <BiArrowBack
            onClick={(e) => {
              e.preventDefault();
              setDrawer(!drawer);
              setErrMessage("");
            }}
            className="text-lg cursor-pointer"
          />
          <span className="sr-only">Close navigation</span>
          <Heading text={"Bayar Tagihan"} variant={"text-lg"} />
          <span className="text-xs font-bold text-sky-500">(#{tagar})</span>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="w-full flex flex-col gap-2"
        >
          <FloatingLabel
            type={"text"}
            id={"name"}
            value={name}
            htmlFor={"name"}
            text={"Nama lengkap"}
            readOnly={true}
            onChange={(e) => setName(e.target.value)}
          />
          <FloatingLabel
            type={"text"}
            id={"kios_los"}
            value={stallName}
            htmlFor={"kios_los"}
            text={"Kios/Los"}
            readOnly={true}
            onChange={(e) => setStallName(e.target.value)}
          />
          <FloatingLabel
            type={"number"}
            id={"stallCost"}
            value={stallCost}
            htmlFor={"stallCost"}
            text={"Biaya Lapak"}
            readOnly={true}
            onChange={(e) => setStallCost(e.target.value)}
          />
          <FloatingLabel
            type={"number"}
            id={"wasteCost"}
            value={wasteCost}
            htmlFor={"wasteCost"}
            text={"Biaya Sampah"}
            readOnly={true}
            onChange={(e) => setWasteCost(e.target.value)}
          />
          <FloatingLabel
            type={"number"}
            id={"priceAmount"}
            value={priceAmount}
            htmlFor={"priceAmount"}
            text={"Total Pembayaran"}
            readOnly={true}
            onChange={(e) => setPriceAmount(e.target.value)}
          />
          <Select
            menuPlacement="top"
            className=""
            options={paymentOptions}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#f0f9ff",
                primary: "#38bdf8",
              },
            })}
            styles={{
              input: (base) => ({
                ...base,
                "input: focus": {
                  boxShadow: "none",
                },
              }),
            }}
            onChange={(e) => {
              setPaymentMethod(e.value);
              setErrMessage("");
            }}
            placeholder="Pilih tipe pembayaran ..."
          />
          <div className="w-full">
            {errMessage && (
              <Alert
                message={errMessage}
                variant={"text-slate-500 border border-slate-300"}
              />
            )}
          </div>
          <Button
            type={"submit"}
            text={"Lanjutkan Pembayaran"}
            variant={"mt-4 w-full bg-sky-400 hover:bg-sky-500 text-white"}
          />
        </form>
      </div>
      <div
        onClick={() => {
          setDrawer(!drawer);
          setErrMessage("");
        }}
        className={`${drawer ? "fixed inset-0" : "hidden"} z-10`}
      ></div>
      <div
        className={`${chargeLoading
          ? "fixed inset-0 z-20 flex justify-center items-center gap-2 bg-black/5 backdrop-blur-sm"
          : "hidden"
          }`}
      >
        <Spinner /> Memproses pembayaran...
      </div>
    </>
  );
};

export default UserBill;
