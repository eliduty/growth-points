"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle, Users, Clock, User, LogOut } from "lucide-react";
import { useMembers, useExchangeDays } from "@/hooks/use-members";
import { useUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { MemberGroup } from "@/components/parent/MemberGroup";
import { AddMemberDialog } from "@/components/parent/AddMemberDialog";
import { ExchangeDaysDialog } from "@/components/parent/ExchangeDaysDialog";
import { SettingsCard } from "@/components/parent/SettingsCard";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";

const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default function ParentSettingsPage() {
  const { children, parents, isLoading, isError, error, refetch, isFetching, addMember, isAddingMember, deleteMember } = useMembers();
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
      {/* 成员管理 */}
      <SettingsCard title="成员管理" icon={Users} delay={0.1} className="mb-4">
        <MemberGroup
          title="孩子"
          members={children}
          onDelete={handleDeleteMember}
          onAdd={() => setAddChildDialogOpen(true)}
          isAdding={isAddingMember}
        />

        <MemberGroup
          title="家长"
          members={parents}
          onDelete={handleDeleteMember}
          onAdd={() => setAddParentDialogOpen(true)}
          isAdding={isAddingMember}
        />
      </SettingsCard>

      {/* 兑换日设置 */}
      <SettingsCard title="兑换日设置" icon={Clock} delay={0.2} className="mb-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">当前设置</span>
          </div>
          <span className="text-base font-medium text-text">{exchangeDaysText}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExchangeDaysDialogOpen(true)}
          disabled={isUpdating}
          className="w-full bg-white hover:bg-primary hover:text-white transition-colors"
        >
          修改设置
        </Button>
      </SettingsCard>

      {/* 个人信息 */}
      <SettingsCard title="个人信息" icon={User} delay={0.3} className="mb-4">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-text-secondary">用户名</span>
          <span className="text-base font-medium text-text">{user?.username}</span>
        </div>
      </SettingsCard>

      {/* 退出登录 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full bg-white border-border hover:bg-error hover:text-white hover:border-error transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>
      </motion.div>

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
        content={deleteTarget ? `确定要删除成员 "${deleteTarget.username}" 吗？` : ""}
        subContent="删除后该成员的所有数据将被清除。"
        warningText="此操作不可恢复，请谨慎操作。"
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
