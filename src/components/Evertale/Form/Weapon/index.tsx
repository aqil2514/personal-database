"use client";

import { ADD_BUTTON_STYLE, INPUT_STYLE, SECTION_TITLE_STYLE, SELECT_STYLE, TEXTAREA_STYLE } from "@/components/Layouting/Styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import WeaponStatus from "./WeaponStatus";
import WeaponAscend from "./WeaponAscend";
import { WeaponProvider, useWeaponData } from "@/components/Evertale/Providers";
import WeaponImage from "./WeaponImage";
import WeaponButton from "./WeaponButton";
// import { FormEvent } from "react";

export default function Form() {
  const formRef = useRef(null);
  const router = useRouter();
  // const submitHandler = async (e: any) => {
  //   e.preventDefault();
  //   const dataForm = new FormData(e.target);
  //   let value = [];
  //   let key = [];

  //   for (const formValue of dataForm.values()) {
  //     value.push(formValue);
  //   }

  //   for (const formKey of dataForm.keys()) {
  //     key.push(formKey);
  //   }

  //   const data: Record<string, string> = {};
  //   for (let i = 0; i < key.length; i++) {
  //     data[key[i]] = value[i] as string;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post("/api/gamelingo/newEvertale/weapon", {
  //       data,
  //     });

  //     alert(res.data.msg);
  //     console.log(res.data);
  //     router.replace("/admin/gamelingo/evertale/weapons");
  //   } catch (error) {
  //     console.error(error);
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.status === 422) {
  //         alert(error.response?.data.msg);
  //         console.error("Terjadi kesalahan : ", error.response?.data.msg);
  //       }
  //       if (error.response?.status === 500) {
  //         alert("Terjadi kesalahan pada server");
  //         console.error("Terjadi kesalahan : ", error);
  //       }
  //       console.error(error);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <form method="post" ref={formRef}>
      <WeaponProvider>
        <WeaponStatus />
        <WeaponImage />
        <WeaponAscend />
        <WeaponButton />
      </WeaponProvider>
    </form>
  );
}
