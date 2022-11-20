import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Field, Heading, Input, TabTitle } from "../../UI/atoms";
import { useDispatch, useSelector } from "react-redux";
import { getIncome, getInvoices } from "../../../features/invoices/invoiceActions";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react/lib/esm/components";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Pendapatan Retribusi Pasar",
        },
    },
};

const AdminDashboard = () => {
    TabTitle("Dashboard");

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [month, setMonth] = useState("");
    const [kiosIncome, setKiosIncome] = useState("");
    const [losIncome, setLosIncome] = useState("");
    const [wasteIncome, setWasteIncome] = useState("");
    const [items, setItems] = useState("");

    const { income, invoices, isLoading } = useSelector((state) => state.invoices);

    useEffect(() => {
        dispatch(getInvoices({ limit: 10, q: "" }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIncome({ startDate, endDate }));
    }, [dispatch, startDate, endDate]);

    useEffect(() => {
        setItems(invoices && invoices.data);
    }, [invoices]);

    useEffect(() => {
        income &&
            setMonth(
                income?.wasteRetribution?.map((income) => {
                    return `${income._id.month}/${income._id.year}`;
                })
            );

        setKiosIncome(
            income?.kiosRetribution?.map((income) => {
                return income.totalIncome
            })
        );

        setLosIncome(
            income?.losRetribution?.map((income) => {
                return income.totalIncome
            })
        );

        setWasteIncome(
            income?.wasteRetribution?.map((income) => {
                return income.totalIncome
            })
        )
    }, [income]);

    const labels = month;
    const data = {
        labels,
        datasets: [
            {
                label: "Kios",
                data: kiosIncome,
                borderColor: "rgb(34,197,94)",
                backgroundColor: "rgba(134, 239, 172, 0.5)",
            },
            {
                label: "Los",
                data: losIncome,
                borderColor: "rgb(6,182,212)",
                backgroundColor: "rgba(56, 189, 248, 0.5)",
            },
            {
                label: "sampah",
                data: wasteIncome,
                borderColor: "rgb(245,158,11)",
                backgroundColor: "rgba(249, 115, 22,0.5)",
            },
        ]
    };

    return (
        <div className="flex-1 relative flex flex-col gap-4">
            <section className="mb-4">
                <Heading text={"Dashboard"} variant={"text-xl"} />
            </section>
            <section className="mb-8">
                <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-end sm:items-center gap-2">
                    <section className="w-full sm:max-w-max flex justify-between items-center gap-1 border rounded text-xs">
                        <Input type={"date"} variant={"border-0 rounded-l"} onChange={(e) => setStartDate(e.target.value)} />
                        <span className="w-max text-center">Sampai</span>
                        <Input type={"date"} variant={"border-0 rounded-r"} onChange={(e) => setEndDate(e.target.value)} />
                    </section>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePrint();
                        }}
                    >
                        <Button type={"submit"} text={"Cetak Retribusi"} variant={"max-w-max bg-sky-400 hover:bg-sky-7000 text-white"} />
                    </form>
                </div>
                <div className="pl-2 lg:pl-4 border-l" ref={componentRef}>
                    <Bar plugins={[ChartDataLabels]} options={options} data={data} />
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
                    ))
                }
                {
                    (isLoading) && (
                        <div className="absolute inset-0 flex justify-center items-center">
                            <Spinner />
                        </div>
                    )
                }
            </section>
        </div>
    );
};

export default AdminDashboard;