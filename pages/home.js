import Head from "next/head";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import withAuth from "@utils/withAuth";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import { UserContext } from "@utils/useUser";

const Home = () => {
  const user = useContext(UserContext);
  const [progress, setProgress] = useState([]);
  const [view, setView] = useState(1);
  const [openSurah, setOpenSurah] = useState(0);
  const [openVerse, setOpenVerse] = useState(0);
  const [quran, setQuran] = useState(null);
  const [surah, setSurah] = useState(0);
  const [verse, setVerse] = useState(0);
  const [showStatus, setShowStatus] = useState(0);
  const [status, setStatus] = useState(0);
  const [reload, setReload] = useState(0);

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

  const setViewAll = () => {
    setView(1);
  };

  const setViewCompleted = () => {
    setView(2);
  };

  const setViewOnGoing = () => {
    setView(3);
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

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/user", config);
      if (data.error) {
        console.log("fetching failed");
      } else {
        setProgress(data.progress);
      }
    } catch (err) {
      console.log("error fetching user data");
    }
  };

  const insertProgress = async () => {
    try {
      setShowStatus(0);
      const { data } = await axios.post(
        "/api/user/progress",
        { surah_id: surah, verse_id: verse },
        config
      );
      if (data.error) {
        setStatus(0);
      } else {
        setReload(-reload);
        setStatus(1);
      }
      setShowStatus(1);
      setTimeout(() => {
        setShowStatus(0);
      }, 5000);
    } catch (err) {
      console.log("Error on inserting progress");
    }
  };

  useEffect(() => {
    getAllSurah();
  }, []);

  useEffect(() => {
    getUserData();
  }, [reload]);

  return (
    <Layout>
      <Head>
        <title>Mup | Track your murojaah progress</title>
      </Head>
      <Navbar />
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-4">
        <div className="p-6 space-y-4 flex-grow md:w-0">
          <p>Overview</p>
          <div className="flex items-center flex-wrap gap-4">
            <button
              onClick={setViewAll}
              className={`w-32 text-lg font-semibold grid place-items-center p-4 rounded-lg border-2 hover:bg-indigo-50 ${
                view === 1 ? "bg-indigo-50 border-indigo-700" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={setViewCompleted}
              className={`w-32 text-lg font-semibold grid place-items-center p-4 rounded-lg border-2 hover:bg-indigo-50 ${
                view === 2 ? "bg-indigo-50 border-indigo-700" : ""
              }`}
            >
              Completed
            </button>
            <button
              onClick={setViewOnGoing}
              className={`w-32 text-lg font-semibold grid place-items-center p-4 rounded-lg border-2 hover:bg-indigo-50 ${
                view === 3 ? "bg-indigo-50 border-indigo-700" : ""
              }`}
            >
              On Going
            </button>
          </div>
          <p className="pt-4">Snapshots</p>
          {progress.length === 0 ? (
            <div className="text-center">No Data Available</div>
          ) : (
            <div className="grid grid-cols-1 phone:grid-cols-2 laptop:grid-cols-3 gap-4">
              {progress.map((surah) => {
                if (view === 1) {
                  return (
                    <div
                      key={surah.surah_id}
                      className={`${
                        surah.total_verses === surah.verse_id
                          ? "bg-indigo-700 text-white"
                          : ""
                      } border-indigo-700 border-2 rounded-lg px-6 py-4`}
                    >
                      <div className="flex justify-between items-center flex-wrap phone:block font-semibold">
                        <p className="text-xl">{surah.transliteration}</p>
                        <p>{surah.total_verses} total verse</p>
                      </div>
                      <div className="text-xs phone:text-sm flex flex-wrap items-center justify-between">
                        <p>{surah.verse_id} verse memorized</p>
                        <p>{surah.total_verses - surah.verse_id} verse left</p>
                      </div>
                    </div>
                  );
                } else if (
                  view === 2 &&
                  surah.verse_id === surah.total_verses
                ) {
                  return (
                    <div
                      key={surah.surah_id}
                      className="bg-indigo-700 text-white border-indigo-700 border-2 rounded-lg px-6 py-4"
                    >
                      <div className="flex justify-between items-center flex-wrap phone:block font-semibold">
                        <p className="text-xl">{surah.transliteration}</p>
                        <p>{surah.total_verses} total verse</p>
                      </div>
                      <div className="text-xs phone:text-sm flex flex-wrap items-center justify-between">
                        <p>{surah.verse_id} verse memorized</p>
                        <p>{surah.total_verses - surah.verse_id} verse left</p>
                      </div>
                    </div>
                  );
                } else if (
                  view === 3 &&
                  surah.verse_id !== surah.total_verses
                ) {
                  return (
                    <div
                      key={surah.surah_id}
                      className="border-indigo-700 border-2 rounded-lg px-6 py-4"
                    >
                      <div className="flex justify-between items-center flex-wrap phone:block font-semibold">
                        <p className="text-xl">{surah.transliteration}</p>
                        <p>{surah.total_verses} total verse</p>
                      </div>
                      <div className="text-xs phone:text-sm flex flex-wrap items-center justify-between">
                        <p>{surah.verse_id} verse memorized</p>
                        <p>{surah.total_verses - surah.verse_id} verse left</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className="p-6 space-y-4 w-full phone:w-72">
          <p>Insert progression</p>
          <div
            className={`${showStatus ? "block" : "hidden"} w-full ${
              status ? "bg-green-500" : "bg-red-500"
            } py-2 px-4 rounded-lg text-white font-medium`}
          >
            {status ? "Success" : "Error"}
          </div>
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
                      key={q.surah_id}
                      value={q.surah_id}
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
