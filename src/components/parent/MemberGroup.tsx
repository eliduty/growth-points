"use client";

import { Plus, Smile, UserCog } from "lucide-react";
import { MemberListItem } from "./MemberListItem";
import type { Member } from "@/types";

interface MemberGroupProps {
  title: string;
  role: "CHILD" | "PARENT";
  members: Member[];
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  isAdding?: boolean;
}

export function MemberGroup({
  title,
  role,
  members,
  onDelete,
  onAdd,
  isAdding = false,
}: MemberGroupProps) {
  const Icon = role === "CHILD" ? Smile : UserCog;

  const labelColor = role === "CHILD" ? "stroke-[#FF6B35]" : "stroke-[#5B7FFF]";
  const textColor = role === "CHILD" ? "text-[#FF6B35]" : "text-[#5B7FFF]";

  return (
    <div className="mb-4 last:mb-0">
      {/* 分组标题 - 原型样式：带图标 */}
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className={`w-3.5 h-3.5 ${labelColor}`} strokeWidth={2} />
        <span className={`text-sm ${textColor}`}>{title}</span>
      </div>

      {/* 成员列表 */}
      <div className="space-y-0">
        {members.length === 0 ? (
          <div className="text-center py-4 text-text-secondary text-sm">
            暂无成员
          </div>
        ) : (
          members.map((member) => (
            <MemberListItem
              key={member.id}
              member={member}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* 添加按钮 */}
      {onAdd && (
        <button
          onClick={onAdd}
          disabled={isAdding}
          className="w-full flex items-center justify-center gap-2 py-2.5 mt-3 rounded-lg bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] text-white shadow-[0_4px_12px_rgba(91,127,255,0.2)] hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Plus className="w-[18px] h-[18px]" strokeWidth={2} />
          <span className="text-sm font-medium">添加{title}</span>
        </button>
      )}
    </div>
  );
}
