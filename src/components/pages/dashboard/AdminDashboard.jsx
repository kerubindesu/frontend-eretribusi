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
import { Button, Heading, Input, TabTitle } from "../../UI/atoms";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "../../../features/invoices/invoiceActions";

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

    const { income } = useSelector((state) => state.invoices);

    useEffect(() => {
        dispatch(getIncome({ startDate, endDate }));
    }, [dispatch, startDate, endDate]);

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

    console.log(income)

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
        <div className="flex-1 relative flex flex-col">
            <section className="mb-8">
                <Heading text={"Dashboard"} variant={"text-xl"} />
            </section>
            <section>
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
                        <Button type={"submit"} text={"Cetak Retribusi"} variant={"max-w-max bg-sky-400 hover:bg-sky-500 text-white"} />
                    </form>
                </div>
                <div className="pl-2 lg:pl-4 border-l" ref={componentRef}>
                    <Bar plugins={[ChartDataLabels]} options={options} data={data} />
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;