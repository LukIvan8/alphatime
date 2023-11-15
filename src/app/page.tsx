import { sb } from "@/service/config";

export const revalidate = 0;

export default async function Home() {
  const { data, error } = await sb
    .from("timetable")
    .select("name, classes (*)");

  return (
    <main className="flex min-h-[100dvh] flex-col items-center gap-12 p-12">
      <div className="flex flex-col gap-2 items-start w-2/3 mx-auto">
        {data &&
          !error &&
          data.map((timetable, id) => (
            <div key={id}>
              <p className="text-lg font-bold">{timetable.name}</p>
              {timetable.classes.map((clss, id) => {
                for (let i = 1; i < 6; i++) {
                  if (clss.weekday == i) {
                    return (
                      <div key={id}>
                        {clss.weekday}
                        {clss.subject}
                      </div>
                    );
                  }
                }
              })}
            </div>
          ))}
      </div>
    </main>
  );
}
