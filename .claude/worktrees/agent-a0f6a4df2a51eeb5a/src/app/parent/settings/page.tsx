"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle, Plus, Settings, User, Star, LogOut } from "lucide-react";
import { useMembers, useExchangeDays } from "@/hooks/use-members";
import { useUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { MemberCard } from "@/components/parent/MemberCard";
import { AddMemberDialog } from "@/components/parent/AddMemberDialog";
import { ExchangeDaysDialog } from "@/components/parent/ExchangeDaysDialog";
import { SettingsCard } from "@/components/parent/SettingsCard";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";

const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default function ParentSettingsPage() {
  const { children, parents, isLoading, isError, error, refetch, isFetching, addMember, isAddingMember, deleteMember, isDeletingMember } = useMembers();
  const { exchangeDays, updateExchangeDays, isUpdating } = useExchangeDays();
  const { user } = useUser();
  const { logout } = useAuth();

  // 弹窗状态
  const [addChildDialogOpen, setAddChildDialogOpen] = useState(false);
  const [addParentDialogOpen, setAddParentDialogOpen] = useState(false);
  const [exchangeDaysDialogOpen, setExchangeDaysDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // 删除成员状态
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; username: string } | null>(null);

  // 处理删除成员
  const handleDeleteMember = (id: string) => {
    const member = [...children, ...parents].find((m) => m.id === id);
    if (member) {
      setDeleteTarget({ id, username: member.username });
      setDeleteConfirmOpen(true);
    }
  };

  // 确认删除
  const confirmDelete = async () => {
    if (deleteTarget) {
      deleteMember(deleteTarget.id);
    }
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  // 取消删除
  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  // 确认退出登录
  const confirmLogout = async () => {
    await logout();
    setLogoutConfirmOpen(false);
  };

  // 取消退出登录
  const cancelLogout = () => {
    setLogoutConfirmOpen(false);
  };

  // 处理退出登录按钮点击
  const handleLogout = () => {
    setLogoutConfirmOpen(true);
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-500 mb-4">{error?.message || "加载失败"}</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            重新加载
          </button>
        </div>
      </div>
    );
  }

  // 获取兑换日显示文本
  const exchangeDaysText = exchangeDays.length > 0
    ? exchangeDays.map((d) => WEEKDAY_NAMES[d]).join("、")
    : "未设置";

  return (
    <div className="p-4">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-text">设置</h1>
          {isFetching && (
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>刷新中...</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* 孩子列表 */}
      <SettingsCard title="孩子成员" className="mb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {children.map((child) => (
            <MemberCard
              key={child.id}
              member={child}
              onDelete={handleDeleteMember}
              showPoints
            />
          ))}
        </div>

        {/* 添加孩子按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAddChildDialogOpen(true)}
          disabled={isAddingMember}
          className="w-full"
        >
          <Plus className="w-4 h-4" />
          添加孩子
        </Button>
      </SettingsCard>

      {/* 家长列表 */}
      <SettingsCard title="家长成员" className="mb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {parents.map((parent) => (
            <MemberCard
              key={parent.id}
              member={parent}
              onDelete={handleDeleteMember}
            />
          ))}
        </div>

        {/* 添加家长按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAddParentDialogOpen(true)}
          disabled={isAddingMember}
          className="w-full"
        >
          <Plus className="w-4 h-4" />
          添加家长
        </Button>
      </SettingsCard>

      {/* 兑换日设置 */}
      <SettingsCard title="兑换日设置" className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-text-secondary">{exchangeDaysText}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExchangeDaysDialogOpen(true)}
            disabled={isUpdating}
          >
            <Settings className="w-4 h-4" />
            设置
          </Button>
        </div>
      </SettingsCard>

      {/* 个人信息 */}
      <SettingsCard title="个人信息" className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-light/20 to-secondary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <div className="text-base font-semibold text-text">{user?.username}</div>
            <div className="text-sm text-text-secondary">
              {user?.role === "PARENT" ? "家长" : "孩子"}
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* 退出登录 */}
      <Button
        variant="destructive"
        onClick={handleLogout}
        className="w-full"
      >
        <LogOut className="w-4 h-4" />
        退出登录
      </Button>

      {/* 添加孩子弹窗 */}
      <AddMemberDialog
        isOpen={addChildDialogOpen}
        onClose={() => setAddChildDialogOpen(false)}
        onAdd={(data) => addMember(data)}
        isAdding={isAddingMember}
        defaultRole="CHILD"
      />

      {/* 添加家长弹窗 */}
      <AddMemberDialog
        isOpen={addParentDialogOpen}
        onClose={() => setAddParentDialogOpen(false)}
        onAdd={(data) => addMember(data)}
        isAdding={isAddingMember}
        defaultRole="PARENT"
      />

      {/* 兑换日设置弹窗 */}
      <ExchangeDaysDialog
        isOpen={exchangeDaysDialogOpen}
        onClose={() => setExchangeDaysDialogOpen(false)}
        currentDays={exchangeDays}
        onUpdate={(days) => updateExchangeDays(days)}
        isUpdating={isUpdating}
      />

      {/* 删除成员确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={deleteConfirmOpen}
        title="删除成员"
        content={deleteTarget ? `确定要删除成员 "${deleteTarget.username}" 吗？删除后该成员的所有数据将被清除。` : ""}
        destructive
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* 退出登录确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={logoutConfirmOpen}
        title="退出登录"
        content="确定要退出登录吗？"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}