import React from "react";
import useSWR from "swr";
import { Data } from "./Data";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export type DataResponse = {
  lsData: string[];
  conjure: string[];
  rss: Evertale.Misc.TypeSkill;
};

export default function CharStatus() {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <p>Mengambil data...</p>;
  if (error) return <p>Error...</p>;
  return <Data info={data.data} />;
}
