import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoice } from "../../../features/invoices/invoiceActions";
import { TabTitle, Heading, Button, Image } from "../../UI/atoms";
import { useReactToPrint } from "react-to-print";
import { Logo } from "../../../assets/images";
import { Spinner } from "flowbite-react/lib/esm/components";

const InvoiceDetail = () => {
  TabTitle("Invoice");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { isLoading, invoice, isError } = useSelector(
    (state) => state.invoices
  );

  useEffect(() => {
    if (isError === 404) return navigate(-1);
  });

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

  useEffect(() => {
    invoice && setData(invoice);
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (data.payment_type) {
      case "bca":
        window.location.assign(
          "https://simulator.sandbox.midtrans.com/bca/va/index"
        );
        break;
      case "bni":
        window.location.assign(
          "https://simulator.sandbox.midtrans.com/bni/va/index"
        );
        break;
      case "bri":
        window.location.assign(
          "https://simulator.sandbox.midtrans.com/bri/va/index"
        );
        break;
      case "permata":
        window.location.assign(
          "https://simulator.sandbox.midtrans.com/permata/va/index"
        );
        break;
      case "shopeepay":
      case "gopay":
        window.location.assign(data.action);
        break;
      default:
        console.log("tipe pembayaran tidak tersedia");
    }
  };

  return (
    <>
      <div className="flex-1 relative flex flex-col">
        <>
          <div className="flex flex-col">
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Heading text={document.title} variant={"text-xl"} />
                <span
                  className={`py-1 px-2 rounded font-semibold text-center ${invoice?.transaction_status !== "settlement"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-green-100 text-green-500"
                    }`}
                >
                  {invoice?.transaction_status !== "settlement"
                    ? "Pending"
                    : "Paid"}
                </span>
              </div>
              {invoice?.transaction_status !== "settlement" ? (
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Button
                    type={"submit"}
                    text={"Bayar"}
                    variant={
                      "w-[6rem] bg-orange-500 text-white hover:shadow-xl hover:bg-orange-500/90"
                    }
                  />
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePrint();
                  }}
                >
                  <Button
                    type={"submit"}
                    text={"Cetak Invoice"}
                    variant={
                      "w-max bg-sky-500 text-white hover:shadow-xl hover:bg-sky-500/90"
                    }
                  />
                </form>
              )}
            </div>
          </div>

          {data.payment_type !== "gopay" &&
            data.payment_type !== "shopeepay" &&
            data.transaction_status !== "settlement" && (
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">VA NUMBER :</span>
                  <span className="p-2 bg-sky-400/20 w-max rounded font-bold">
                    {data.action}
                  </span>
                </div>
                <span className="text-sm">
                  Salin VA Number untuk menyelesaikan pembayaran
                </span>
              </div>
            )}
          <div
            className="mt-8 p-4 border-2 border-dashed rounded relative text-slate-700"
            ref={componentRef}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-20">
              <Image
                src={Logo}
                alt={"logo"}
                variant="max-w-[16rem] opacity-40"
              />
              <span className="text-6xl text-slate-600 font-semibold">iRetribusi</span>
            </div>
            <div className="p-4 flex justify-between items-center font-bold">
              <span>{data.name}</span>
              <span
                className={`py-1 px-2 rounded font-semibold text-center ${invoice.transaction_status !== "settlement"
                  ? "bg-orange-100 text-orange-500"
                  : "bg-green-100 text-green-500"
                  }`}
              >
                {invoice.transaction_status !== "settlement"
                  ? "Pending"
                  : "Paid"}
              </span>
            </div>
            <div className="p-4 border-b border-dashed flex justify-between items-center">
              <span className="font-semibold text-xs">#{data.order_id}</span>
              <span>{data.transaction_time}</span>
            </div>

            <div className="p-4 border-b border-dashed flex justify-between items-center">
              <span>Metode Pembayaran</span>
              <span>{data?.payment_type?.toUpperCase()}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span>Biaya {data?.stall_type?.toUpperCase()}</span>
              <span className="font-semibold">Rp {data.stall_cost}</span>
            </div>
            <div className="p-4 border-b flex justify-between items-center">
              <span>Biaya Sampah</span>
              <span className="font-semibold">Rp {data.waste_cost}</span>
            </div>
            <div className="p-4 flex justify-between items-center font-bold">
              <span>Total</span>
              <span>Rp {data.total_price}</span>
            </div>
          </div>
        </>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default InvoiceDetail;
