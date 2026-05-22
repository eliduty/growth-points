"use client";

import { Smile, UserCog, UserPlus } from "lucide-react";
import { MemberListItem } from "./MemberListItem";
import type { Member } from "@/types";

interface MemberGroupProps {
  title: string;
  members: Member[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  isAdding?: boolean;
}

export function MemberGroup({
  title,
  members,
  onAdd,
  onDelete,
  isAdding = false,
}: MemberGroupProps) {
  const isChild = title === "孩子";

  return (
    <div className="mb-4 last:mb-0">
      {/* 分组标签 */}
      <div className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-2">
        {isChild ? (
          <Smile className="w-3.5 h-3.5" />
        ) : (
          <UserCog className="w-3.5 h-3.5" />
        )}
        <span>{title}</span>
      </div>

      {/* 成员列表 */}
      <div className="space-y-0">
        {members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* 添加按钮 */}
      <button
        onClick={onAdd}
        disabled={isAdding}
        className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-white font-medium
          bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF]
          shadow-[0_4px_12px_rgba(91,127,255,0.2)]
          transition-all duration-150 ease-out
          hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] hover:-translate-y-[1px]
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UserPlus className="w-[18px] h-[18px]" />
        添加{title}
      </button>
    </div>
  );
}
