"use client";

import { Plus } from "lucide-react";
import { MemberListItem } from "./MemberListItem";
import type { Member } from "@/types";

interface MemberGroupProps {
  title: string;
  members: Member[];
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  isAdding?: boolean;
}

export function MemberGroup({
  title,
  members,
  onDelete,
  onAdd,
  isAdding = false,
}: MemberGroupProps) {
  return (
    <div className="space-y-3">
      {/* 分组标题 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{title}</span>
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
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] text-white shadow-[0_4px_12px_rgba(91,127,255,0.2)] hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">添加{title}</span>
        </button>
      )}
    </div>
  );
}
