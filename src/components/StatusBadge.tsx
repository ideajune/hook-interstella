import React from "react";
import { ActivityStatus } from "@/lib/types";
import {
  CheckCircle2,
  Compass,
  FlaskConical,
  Hammer,
  Handshake,
  Archive,
} from "lucide-react";

interface StatusBadgeProps {
  status: ActivityStatus;
  variant?: "light" | "dark";
}

export function StatusBadge({ status, variant = "light" }: StatusBadgeProps) {
  const config: Record<
    ActivityStatus,
    {
      lightClasses: string;
      darkClasses: string;
      icon: React.ReactNode;
      description: string;
    }
  > = {
    "운영 중": {
      lightClasses: "bg-[#E8F4FC] text-[#0B2340] border-[#147FC5]/30",
      darkClasses: "bg-[#147FC5]/20 text-white border-[#2998D6]/50",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#147FC5]" aria-hidden="true" />,
      description: "현재 실제 운영 및 제공 중인 활동",
    },
    "개발 중": {
      lightClasses: "bg-sky-50 text-sky-900 border-sky-200",
      darkClasses: "bg-sky-900/40 text-sky-100 border-sky-700",
      icon: <Hammer className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />,
      description: "제품·플랫폼·기획안을 구체화하여 개발 중인 단계",
    },
    "연구 주제": {
      lightClasses: "bg-slate-100 text-slate-800 border-slate-300",
      darkClasses: "bg-[#123454] text-[#D9E6F2] border-[#D9E6F2]/30",
      icon: <FlaskConical className="w-3.5 h-3.5 text-[#147FC5]" aria-hidden="true" />,
      description: "기술적 타당성과 실험 프로토콜을 탐구하는 연구 단계",
    },
    "구상 단계": {
      lightClasses: "bg-gray-100 text-gray-700 border-gray-300",
      darkClasses: "bg-white/10 text-[#D9E6F2] border-white/20",
      icon: <Compass className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />,
      description: "중장기 로드맵 상의 개념 및 방향성 구상 단계",
    },
    "협력 모집 중": {
      lightClasses: "bg-blue-50 text-[#147FC5] border-[#147FC5]/40",
      darkClasses: "bg-[#147FC5]/30 text-white border-[#2998D6]",
      icon: <Handshake className="w-3.5 h-3.5 text-[#147FC5]" aria-hidden="true" />,
      description: "산학연 파트너 및 공동 연구·사업화 협력을 모집 중인 단계",
    },
    "종료": {
      lightClasses: "bg-gray-100 text-gray-500 border-gray-200",
      darkClasses: "bg-gray-800 text-gray-400 border-gray-700",
      icon: <Archive className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />,
      description: "종료된 과제 또는 활동",
    },
  };

  const item = config[status] ?? config["구상 단계"];

  return (
    <span
      title={item.description}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        variant === "dark" ? item.darkClasses : item.lightClasses
      }`}
    >
      {item.icon}
      <span>상태: {status}</span>
    </span>
  );
}
