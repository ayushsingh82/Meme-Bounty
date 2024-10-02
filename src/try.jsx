import React, { useEffect, useState } from "react";
import Problem from "./Problem";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import MaxWidthWrapper from "../MaxWidthWrapper";
import axios from "axios";
import { useGetQuestions } from "@/hooks/getQuestions";
import { ABI_Bank } from "@/utils/problems";
import { Skeleton } from "../ui/skeleton";

const ProblemsContainer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [problems, setProblems] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  useEffect(() => {
    //calling the contract to detch the data of the problems.
    if (ABI_Bank.length == 0) {
      console.error("Something horible happened cant access the Bank_address.");
      return;
    }
    const getQuestions = async () => {
      const contract = await window.tronLink.tronWeb.contract(
        ABI_Bank,
        import.meta.env.VITE_NILE_BANK_ADD,
      );
      const questions = await contract.questionList().call();
      setProblems(questions);
      setLoading(false);
    };
    getQuestions();
  }, [ABI_Bank]);
  const isAnyOpen = activeIndex !== null;
  if(isLoading){
    return(
      <main className="relative flex-1 p-2">
        <h1 className='text-[1.6rem] text-center pb-2 text-white border-b font-semibold border-gray-700'>Problems</h1>
        <Table className="mr-auto w-full max-w-[1000px] px-4 text-white">
          <TableHeader>
            <TableRow className="border-gray-500 text-left text-white">
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Difficulty (Mesured in 🐑)</TableHead>
              <TableHead>Take Part</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
          </TableBody>
        </Table> 
        <h1 className='text-[1.6rem] text-center pb-2 font-semibold text-[#f72045] border-gray-700 text-red'>Loading!!!</h1>
      </main>
    )
  }
  return (
    <main className="relative flex-1 p-2">
      <h1 className='text-[1.6rem] text-center pb-2 text-white border-b font-semibold border-gray-700'>Problems</h1>
      <Table className="mr-auto w-full max-w-[1000px] px-4 text-white">
        <TableHeader>
          <TableRow className="border-gray-500 text-left text-white">
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Difficulty (Mesured in 🐑)</TableHead>
            <TableHead>Take Part</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {problems && 
            problems.length > 0 &&
            problems.map((p, i) => {
              const handleOpen = () => {
                setActiveIndex(activeIndex === i ? null : i);
              };
              const isOpen = i === activeIndex;

              return (
                <Problem
                  key={i}
                  id={i}
                  title={p.name.split('|')[0]}
                  address={p.question}
                  difficulty={p.difficulty}
                  isOpen={isOpen}
                  isAnyOpen={isAnyOpen}
                  handleOpen={handleOpen}
                />
              );
            })}
        </TableBody>
      </Table>

      {problems && !problems.length > 0 && !isLoading && (
        <h1 className="top-1 w-full px-2 pt-5 text-center text-xl text-primary">
          There are no Questions as of now ! come back later or add your own
          question
        </h1>
      )}
    </main>
  );
};

export default ProblemsContainer;