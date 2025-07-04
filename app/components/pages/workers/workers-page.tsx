"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_WORKERS_REQ,
  PAY_SALARIES_REQ,
} from "@/app/utils/requests/client-side.requests";
import UsersTable from "@/app/components/tables/users-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import { Button } from "@mui/material";
import { useWorkerSalary } from "@/app/utils/contexts/paying-salaries-context";
import { usePopup } from "@/app/utils/contexts/popup-contexts";

export default function WorkersPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const [paySalaries, setPaySalaries] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const { deleteAll, addMany, findAll } = useWorkerSalary();
  const { openPopup } = usePopup();

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_WORKERS_REQ);

    if (response.done) {
      fillSearch("workers", { results: response.data.workers, total: response.data.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const actionAll = () => {
    deleteAll();
    if (!selectAll) {
      const data = getSearch("workers")
        .results?.filter((e: any) => e.salary)
        .map((e: any) => ({ worker_id: e.user_name, salary: e.salary }));
      addMany(data);
    }
    setSelectAll(!selectAll);
  };
  const handleDone = async () => {
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(PAY_SALARIES_REQ, {
      data: JSON.stringify(findAll()),
    });
    setLoading(false);
    if (response?.done) {
      openPopup("snakeBarPopup", { message: "تم تسديد الرواتب بنجاح.", type: "success" });
      setPaySalaries(false);
    } else {
      openPopup("snakeBarPopup", { message: response?.message });
    }
  };
  return (
    <div className="relative px-mainxs">
      <UsersTable type={"worker"} data={getSearch("workers").results} paySalaries={paySalaries} />
      <div className="flex flex-col items-center gap-1 absolute left-[20px] top-0 max-w-[130px]">
        {paySalaries && (
          <Button
            onClick={actionAll}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark !w-full"
            variant="contained"
          >
            {selectAll ? "الغاء تحديد" : "تحديد"} الكل
          </Button>
        )}
        <div className="flex gap-1 w-full">
          {paySalaries && (
            <Button
              disabled={findAll().length === 0}
              onClick={handleDone}
              sx={{ fontFamily: "cairo" }}
              className="!bg-mdDark"
              variant="contained"
            >
              تأكيد
            </Button>
          )}
          <Button
            onClick={() => setPaySalaries(!paySalaries)}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            {paySalaries ? "الغاء" : "تسديد الرواتب"}
          </Button>
        </div>
      </div>
    </div>
  );
}
