import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

interface FloatingProposalButtonProps {
  href?: string;
  label?: string;
}

export default function FloatingProposalButton({
  href = "/request-proposal",
  label = "Request Proposal"
}: FloatingProposalButtonProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 lg:hidden">
      <Link
        href={href}
        aria-label={label}
        className="h-12 px-4 sm:px-5 rounded-full bg-[#1b3d24] hover:bg-[#285735] text-white border border-[#3d7a4c] shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
      >
        <FileText className="w-4 h-4 text-[#61CE70] shrink-0" />
        <span>{label}</span>
      </Link>
    </div>
  );
}
