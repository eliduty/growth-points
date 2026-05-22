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
  showPoints?: boolean;
}

export function MemberGroup({
  title,
  members,
  onDelete,
  onAdd,
  isAdding = false,
  showPoints = false,
}: MemberGroupProps) {
  return (
    <div className="space-y-3">
      {/* 分组标题 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{title}</span>
        <span className="text-xs text-text-secondary">{members.length}人</span>
      </div>

      {/* 成员列表 */}
      <div className="space-y-2">
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
              showPoints={showPoints}
            />
          ))
        )}
      </div>

      {/* 添加按钮 */}
      {onAdd && (
        <button
          onClick={onAdd}
          disabled={isAdding}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-text-secondary hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">添加{title.replace("成员", "")}</span>
        </button>
      )}
    </div>
  );
}
