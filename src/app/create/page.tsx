"use client";
import { emptyClass, numToHuman, weekdays } from "@/constants";
import { classesI } from "@/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function CreateTimetable() {
  const [classes, setClasses] = useState<classesI[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  return (
    <div className="flex flex-col max-w-lg mx-auto  sm:p-12 p-2 gap-4">
      <p className="text-4xl mx-auto font-semibold">
        <span className="text-white ">α</span>time
      </p>
      {weekdays.map((weekday, i) => (
        <WeekdayForm
          updateWeekday={setClasses}
          classes={classes[i]}
          idx={i}
          key={i}
          weekday={weekday}
        />
      ))}
      <button
        //@ts-ignore
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className="btn btn-success"
      >
        Подтвердить
      </button>

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box">
          <pre className="py-4 whitespace-pre-wrap">
            {JSON.stringify(classes)}
          </pre>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

function WeekdayForm({
  weekday,
  idx,
  updateWeekday,
  classes,
}: {
  weekday: string;
  classes: classesI[];
  updateWeekday: Dispatch<SetStateAction<classesI[][]>>;
  idx: number;
}) {
  const [weekClasses, setWeekClasses] = useState(classes);
  const [collapsed, setCollapsed] = useState(idx === 5 || idx == 6);

  useEffect(() => {
    updateWeekday((prev) => {
      const newData = [...prev];
      newData[idx] = weekClasses;
      return newData;
    });
  }, [weekClasses]);
  return (
    <div className="flex flex-col gap-2 rounded-xl w-full border p-2 border-gray-600 ">
      <p
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
        className="text-lg font-bold text-base-content select-none"
      >
        {weekday}{" "}
        {collapsed && (
          <span>
            &middot; {weekClasses.length}{" "}
            {weekClasses.length in numToHuman
              ? numToHuman[weekClasses.length as keyof typeof numToHuman]
              : "пар"}
          </span>
        )}
      </p>
      <div className={`flex flex-col gap-3 ${collapsed && "hidden"}`}>
        {weekClasses.map((subj, i) => (
          <CreateSubjectForm
            weekday={idx}
            classData={subj}
            updateClasses={setWeekClasses}
            index={i}
            key={i}
          />
        ))}
      </div>

      <button
        className={`btn btn-neutral self-start ${collapsed && "hidden"} ${
          weekClasses.length > 10 && "btn-error pointer-events-none"
        }`}
        onClick={() => {
          setWeekClasses((prev) => {
            const newClasses = [...prev];
            newClasses.push(emptyClass);
            return newClasses;
          });
        }}
      >
        {weekClasses.length > 10 ? "хватит" : "+ занятие"}
      </button>
    </div>
  );
}

function CreateSubjectForm({
  index,
  updateClasses,
  weekday,
  classData,
}: {
  index: number;
  updateClasses: React.Dispatch<React.SetStateAction<classesI[]>>;
  weekday: number;
  classData: classesI;
}) {
  const [localClass, setLocalClass] = useState(classData);
  const [open, setOpen] = useState(false);
  const [split, setSplit] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLocalClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    updateClasses((prev) => {
      const newData = [...prev];
      newData[index] = localClass;
      return newData;
    });
  }, [localClass]);

  return (
    <div className="flex flex-col max-w-screen-sm gap-1">
      <div className="flex gap-1">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 transition-transform ${
              open ? "rotate-90" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <input
          placeholder="Предмет"
          type="text"
          name="subject"
          value={localClass.subject}
          onChange={handleChange}
          className="input input-sm text-sm w-full input-bordered focus:outline-none md:text-base h-auto"
        />
        <div className="flex flex-col w-24 gap-1 ">
          <input
            placeholder="00:00"
            name="timeStart"
            type="text"
            onChange={handleChange}
            className="input input-bordered input-xs h-auto w-full flex-grow focus:outline-none"
          />
          <input
            placeholder="00:00"
            name="timeEnd"
            onChange={handleChange}
            type="text"
            className="input input-bordered input-xs h-auto w-full flex-grow focus:outline-none"
          />
        </div>
        <div
          onClick={() =>
            updateClasses((prev) => {
              const newPrev = [...prev];
              newPrev.splice(index, 1);
              return newPrev;
            })
          }
          className="btn btn-outline border-error hover:bg-error hover:border-error p-2 "
        >
          X
        </div>
      </div>
      <div className={`flex flex-col gap-1 mt-1 ${!open && "hidden"}`}>
        <div className="flex gap-1 ">
          <div className="md:w-6 w-9"></div>
          <input
            type="text"
            name="auditory1"
            onChange={handleChange}
            placeholder="Аудитория"
            className="input input-bordered input-sm sm:w-28 w-24 focus:outline-none"
          />
          <input
            type="text"
            onChange={handleChange}
            name="teacher1"
            placeholder="Преподаватель"
            className="input input-bordered input-sm sm:w-36 w-28 focus:outline-none"
          />
          <button
            onClick={() => {
              setLocalClass((prev) => {
                if (!prev.split) return { ...prev, split: !localClass.split };
                return {
                  ...prev,
                  split: !localClass.split,
                  auditory2: "",
                  teacher2: "",
                };
              });
            }}
            className="btn btn-neutral btn-xs h-auto md:flex-grow"
          >
            {localClass.split ? "-" : "+"} группа
          </button>
        </div>
        {localClass.split && (
          <div className="flex gap-1 ">
            <div className="w-6"></div>
            <input
              type="text"
              name="auditory2"
              onChange={handleChange}
              placeholder="Аудитория"
              className="input input-bordered input-sm w-28 focus:outline-none"
            />
            <input
              type="text"
              name="teacher2"
              onChange={handleChange}
              placeholder="Преподаватель"
              className="input input-bordered input-sm w-36 focus:outline-none"
            />
          </div>
        )}
        <div className="flex gap-1 mt-[1px] ml-[1px] items-center">
          <div className="md:w-10 w-14"></div>
          <div className="flex">
            <div className="">
              <input
                type="radio"
                onChange={(e) =>
                  setLocalClass((prev) => ({ ...prev, variable: 2 }))
                }
                name={"variable" + index + weekday}
                id={"chet" + index + weekday}
                className="hidden peer/chet"
              />
              <label
                htmlFor={"chet" + index + weekday}
                className="peer-checked/chet:bg-gray-700 p-1 border border-gray-600 rounded-l cursor-pointer"
              >
                Чет
              </label>
            </div>
            <div>
              <input
                defaultChecked
                type="radio"
                name={"variable" + index + weekday}
                onChange={(e) =>
                  setLocalClass((prev) => ({ ...prev, variable: 0 }))
                }
                id={"not" + index + weekday}
                className="hidden peer/not"
              />
              <label
                htmlFor={"not" + index + weekday}
                className="peer-checked/not:bg-gray-700 p-1 border border-gray-600 cursor-pointer"
              >
                ⊘
              </label>
            </div>
            <div>
              <input
                type="radio"
                name={"variable" + index + weekday}
                onChange={(e) =>
                  setLocalClass((prev) => ({ ...prev, variable: 1 }))
                }
                id={"nechet" + index + weekday}
                className="hidden peer/nechet"
              />
              <label
                htmlFor={"nechet" + index + weekday}
                className="peer-checked/nechet:bg-gray-700 p-1 border border-gray-600 rounded-r cursor-pointer"
              >
                НеЧет
              </label>
            </div>
          </div>
          <input
            type="text"
            name="type"
            onChange={handleChange}
            placeholder="Тип занятия"
            className="input input-bordered input-sm focus:outline-none  w-full"
          />
        </div>
      </div>
    </div>
  );
}
