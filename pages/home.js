import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import withAuth from "@utils/withAuth";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import ChartLine from "@components/CharLine";

const Home = () => {
  const [type, setType] = useState(1);
  const [openSurah, setOpenSurah] = useState(0);
  const [openVerse, setOpenVerse] = useState(0);
  const [quran, setQuran] = useState(null);
  const [surah, setSurah] = useState(0);
  const [verse, setVerse] = useState(0);

  const data = [
    {
      balance: 180000,
    },
    {
      balance: 300000,
    },
    {
      balance: 220000,
    },
    {
      balance: 190000,
    },
    {
      balance: 400000,
    },
    {
      balance: 390000,
    },
    {
      balance: 700000,
    },
    {
      balance: 680000,
    },
    {
      balance: 690000,
    },
    {
      balance: 590000,
    },
    {
      balance: 805000,
    },
    {
      balance: 600000,
    },
    {
      balance: 610000,
    },
    {
      balance: 360000,
    },
    {
      balance: 400000,
    },
  ];

  const showSurah = () => {
    setOpenVerse(0);
    setOpenSurah(!openSurah);
  };

  const showVerse = () => {
    setOpenSurah(0);
    if (surah) {
      setOpenVerse(!openVerse);
    }
  };

  const setAllTime = () => {
    setType(1);
  };

  const setMonthly = () => {
    setType(2);
  };

  const setWeekly = () => {
    setType(3);
  };

  const handleSurah = (e) => {
    if (surah !== e.target.value) {
      setVerse(0);
    }
    setOpenSurah(0);
    setSurah(e.target.value);
  };

  const handleVerse = (e) => {
    setOpenVerse(0);
    setVerse(e.target.value);
  };

  const getAllSurah = async () => {
    try {
      const { data } = await axios.get("/api/quran/surah");
      setQuran(data);
    } catch (err) {
      console.log("Error happen");
    }
  };

  const insertProgress = async () => {
    console.log(surah);
    console.log(verse);
  };

  useEffect(() => {
    getAllSurah();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Murochart | Chart for your Murojaah</title>
      </Head>
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-4">
        <div className="p-6 space-y-4 flex-grow md:w-0">
          <p>Overview</p>
          <div className="flex items-center flex-wrap gap-4">
            <button
              onClick={setAllTime}
              className={`w-32 text-xl font-semibold grid place-items-center p-4 rounded-lg border-2 hover:bg-indigo-50 ${
                type === 1 ? "bg-indigo-50 border-indigo-700" : ""
              }`}
            >
              All Time
            </button>
            <button
              onClick={setMonthly}
              className={`w-32 text-xl font-semibold grid place-items-center p-4 rounded-lg border-2 hover:bg-indigo-50 ${
                type === 2 ? "bg-indigo-50 border-indigo-700" : ""
              }`}
            >
              Monthly
            </button>
            <button
              onClick={setWeekly}
              className={`w-32 text-xl font-semibold grid place-items-center p-4 rounded-lg border-2 hover:bg-indigo-50 ${
                type === 3 ? "bg-indigo-50 border-indigo-700" : ""
              }`}
            >
              Weekly
            </button>
          </div>
          <p className="pt-4">Snapshots</p>
          <div className="h-96">
            <ChartLine isBalance data={data} />
          </div>
        </div>
        <div className="p-6 space-y-4 w-full phone:w-72">
          <p>Insert progression</p>
          <button
            onClick={showSurah}
            className="text-left font-medium hover:bg-indigo-50 focus:bg-indigo-50 focus:border-indigo-700 rounded-lg border-2 py-2 px-4 w-full flex justify-between items-center"
          >
            {surah !== 0 ? quran[surah - 1].transliteration : "Select Surah"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`${
              openSurah ? "block" : "hidden"
            } overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-700 hover:scrollbar-thumb-indigo-800 scrollbar-track-transparent scrollbar-track-rounded-full scrollbar-thumb-rounded-full max-h-64 space-y-4 pl-2 pr-4 py-2 rounded-lg border-2 border-indigo-700`}
          >
            {quran
              ? quran.map((q) => {
                  return (
                    <button
                      key={q.id}
                      value={q.id}
                      onClick={handleSurah}
                      className="text-left font-medium hover:bg-indigo-50 focus:bg-indigo-50 focus:border-indigo-700 rounded-lg border-2 py-2 px-4 w-full"
                    >
                      {q.transliteration}
                    </button>
                  );
                })
              : ""}
          </div>
          <button
            onClick={showVerse}
            className="text-left font-medium hover:bg-indigo-50 focus:bg-indigo-50 focus:border-indigo-700 rounded-lg border-2 py-2 px-4 w-full flex justify-between items-center"
          >
            {verse !== 0 ? verse : "Select Verse"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`${
              openVerse ? "block" : "hidden"
            } overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-700 hover:scrollbar-thumb-indigo-800 scrollbar-track-transparent scrollbar-track-rounded-full scrollbar-thumb-rounded-full max-h-64 space-y-4 pl-2 pr-4 py-2 rounded-lg border-2 border-indigo-700`}
          >
            {surah
              ? [...Array(quran[surah - 1].total_verses)].map((i, index) => {
                  return (
                    <button
                      key={index + 1}
                      value={index + 1}
                      onClick={handleVerse}
                      className="text-left font-medium hover:bg-indigo-50 focus:bg-indigo-50 focus:border-indigo-700 rounded-lg border-2 py-2 px-4 w-full"
                    >
                      {index + 1}
                    </button>
                  );
                })
              : ""}
          </div>
          <button
            onClick={insertProgress}
            className="font-medium focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 border-2 border-indigo-700 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg py-2 px-4 w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Home);
