import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBills } from "../../../features/bills/billActions";
import { Field, Heading, TabTitle } from "../../UI/atoms";
import { getUserRetribution } from "../../../features/retributions/retributionActions";
import { getUserInvoices } from "../../../features/invoices/invoiceActions";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react/lib/esm/components";

const UserDashboard = () => {
    TabTitle("Dashboard");

    const dispatch = useDispatch()
    const [items, setItems] = useState("");

    const { bills, isLoading: bLoading } = useSelector((state) => state.bills); // payload tagihan
    const { retribution, isLoading: rLoading } = useSelector((state) => state.retributions) // payload retribution
    const { invoices, isLoading: iLoading } = useSelector((state) => state.invoices);

    useEffect(() => {
        dispatch(getUserBills({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserRetribution());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserInvoices({ limit: 10, q: "" }));
    }, [dispatch]);

    useEffect(() => {
        setItems(invoices && invoices.data);
    }, [invoices]);

    return (
        <div className="flex-1 relative flex flex-col gap-4">
            <section className="mb-4">
                <Heading text={"Dashboard"} variant={"text-xl"} />
            </section>
            <section className="mb-8 p-4 flex flex-col items-start justify-center gap-4 bg-sky-50 border-y-2 border-sky-400 rounded">
                <div className="w-full flex justify-between items-center">
                    <span className="font-semibold">Hello, {retribution?.user?.name}</span>
                    <span className="font-bold">
                        {`${retribution?.stall?.type?.toUpperCase()} ${retribution?.stall?.name}`}
                    </span>
                </div>
                <div className="-ml-4 p-4 pr-16 w-auto flex flex-col justify-center items-start gap-2 bg-white border-y-2 border-sky-400 rounded-r-full">
                    <span>Total Tagihan</span>
                    <span className="text-2xl font-bold">{bills?.totalItems}</span>
                    <span className="text-sky-400 font-semibold">
                        <Link to="bills">
                            {bills?.totalItems <= 0 ? "Tidak ada tagihan saat ini" : "Segera bayar tagihan anda!"}
                        </Link>
                    </span>
                </div>
            </section>
            <section className="py-4 flex flex-col items-start justify-center gap-4 rounded">
                <span className="font-semibold">Transaksi Terakhir</span>
                {items && items.length <= 0 && (
                    <span className="w-full h-32 flex justify-center items-center text-lg text-slate-500 font-semibold">
                        Tidak ada transaksi akhir-akhir ini
                    </span>
                )}
                {items &&
                    items.map((item, index) => (
                        <Link key={index + 1} to={`invoices/${item._id}`} className="w-full">
                            <div className="p-4 w-full flex justify-around items-center gap-8 bg-white border rounded hover:shadow">
                                <section className="flex-1 flex flex-col sm:flex-row sm:justify-around items-start sm:items-center gap-2 text-slate-800">
                                    <Field
                                        text={item.order_id}
                                        variant={"w-32 text-xs font-bold"}
                                    />
                                    <Field text={item.name} variant={"w-32 font-bold"} />
                                    <Field text={item.transaction_time} variant={"text-xs"} />
                                </section>
                                <section className="flex-1 flex flex-col sm:flex-row sm:justify-between items-end sm:items-center gap-4 sm:gap-2">
                                    <Field
                                        text={`Rp ${item.total_price}`}
                                        variant={"w-20 font-semibold text-center sm:text-start"}
                                    />
                                    <Field
                                        text={`${item.transaction_status === "settlement"
                                            ? "Paid"
                                            : "Pending"
                                            }`}
                                        variant={`py-1 px-2 w-[5rem] rounded-sm font-bold text-center ${item.transaction_status === "settlement"
                                            ? "bg-green-100 text-green-500"
                                            : "bg-orange-100 text-orange-500"
                                            }`}
                                    />
                                </section>
                            </div>
                        </Link>
                    ))}
            </section>
            {(bLoading || rLoading || iLoading) && (
                <div className="absolute inset-0 flex justify-center items-center bg-white">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
