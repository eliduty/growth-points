"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Settings, Trash2, Gift, Clock, CheckCircle, Star, User, RefreshCw, AlertCircle } from "lucide-react";
import { useGifts } from "@/hooks/use-gifts";
import { useTopNavbar } from "@/providers/topnavbar-provider";
import { GiftCard } from "@/components/parent/GiftCard";
import { RedemptionCard, RedemptionSection } from "@/components/parent/RedemptionCard";
import { AddGiftDialog } from "@/components/parent/AddGiftDialog";
import { EditGiftDialog } from "@/components/parent/EditGiftDialog";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";
import { cn } from "@/lib/cn";

interface GiftItem {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
}

export default function ParentGiftsPage() {
  const {
    gifts,
    pendingRedemptions,
    confirmedRedemptions,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    createGift,
    isCreatingGift,
    updateGift,
    isUpdatingGift,
    deleteGift,
    isDeletingGift,
    confirmRedemption,
    isConfirmingRedemption,
    cancelRedemption,
    isCancellingRedemption,
  } = useGifts();

  const { setConfig } = useTopNavbar();

  // 弹窗状态
  const [addGiftDialogOpen, setAddGiftDialogOpen] = useState(false);
  const [editGiftDialogOpen, setEditGiftDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 选中的礼物
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  // 确认兑换弹窗状态
  const [confirmRedemptionDialogOpen, setConfirmRedemptionDialogOpen] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<{
    id: string;
    giftName: string;
    username: string;
    points: number;
  } | null>(null);

  // 设置 TopNavbar 操作按钮
  useEffect(() => {
    setConfig({
      action: (
        <div className="flex items-center gap-1">
          {isFetching && <RefreshCw className="w-3 h-3 animate-spin text-text-muted" />}
          <button
            onClick={() => setAddGiftDialogOpen(true)}
            disabled={isCreatingGift}
            className="flex items-center justify-center"
          >
            <Plus className="w-5 h-5 stroke-primary stroke-width-2" />
          </button>
        </div>
      ),
    });
  }, [setConfig, isCreatingGift, isFetching]);

  // 处理编辑礼物
  const handleEditGift = (gift: GiftItem) => {
    setSelectedGift(gift);
    setEditGiftDialogOpen(true);
  };

  // 处理删除礼物
  const handleDeleteGift = (gift: GiftItem) => {
    setSelectedGift(gift);
    setDeleteConfirmOpen(true);
  };

  // 确认删除礼物
  const handleConfirmDelete = async () => {
    if (selectedGift) {
      await deleteGift(selectedGift.id);
    }
    setDeleteConfirmOpen(false);
    setSelectedGift(null);
  };

  // 打开确认兑换弹窗
  const handleOpenConfirmRedemption = (redemption: {
    id: string;
    giftName: string;
    username: string;
    points: number;
  }) => {
    setSelectedRedemption(redemption);
    setConfirmRedemptionDialogOpen(true);
  };

  // 确认兑换
  const handleConfirmRedemptionAction = async () => {
    if (selectedRedemption) {
      await confirmRedemption(selectedRedemption.id);
    }
    setConfirmRedemptionDialogOpen(false);
    setSelectedRedemption(null);
  };

  // 撤销兑换
  const handleCancelRedemption = async (id: string) => {
    await cancelRedemption(id);
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
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-button"
          >
            <RefreshCw className="w-4 h-4" />
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-nav relative" style={{ background: "var(--bg-gradient)" }}>
      {/* 背景纹理 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235B7FFF' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* 内容区域 */}
      <div className="relative z-1">
        {/* 礼物网格 */}
        {gifts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-card shadow-card border border-border"
          >
            <Gift className="w-12 h-12 text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary mb-2">暂无礼物</p>
            <p className="text-text-secondary text-sm">
              点击上方按钮添加孩子可以兑换的礼物
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-[14px] mb-4">
            {gifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GiftCard
                  gift={gift}
                  onEdit={() => handleEditGift(gift)}
                  onDelete={() => handleDeleteGift(gift)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* 待确认兑换区域 */}
        {pendingRedemptions.length > 0 && (
          <RedemptionSection
            title="待确认兑换"
            count={pendingRedemptions.length}
            type="pending"
          >
            {pendingRedemptions.map((redemption) => (
              <RedemptionCard
                key={redemption.id}
                redemption={redemption}
                onConfirm={() => handleOpenConfirmRedemption({
                  id: redemption.id,
                  giftName: redemption.giftName,
                  username: redemption.username,
                  points: redemption.points,
                })}
                onCancel={handleCancelRedemption}
                isConfirming={isConfirmingRedemption}
                isCancelling={isCancellingRedemption}
              />
            ))}
          </RedemptionSection>
        )}

        {/* 已确认兑换区域 */}
        {confirmedRedemptions.length > 0 && (
          <RedemptionSection
            title="已确认兑换"
            count={confirmedRedemptions.length}
            type="confirmed"
          >
            {confirmedRedemptions.map((redemption) => (
              <RedemptionCard
                key={redemption.id}
                redemption={redemption}
              />
            ))}
          </RedemptionSection>
        )}
      </div>

      {/* 添加礼物弹窗 */}
      <AddGiftDialog
        isOpen={addGiftDialogOpen}
        onClose={() => setAddGiftDialogOpen(false)}
        onAdd={async (data) => {
          await createGift(data);
        }}
      />

      {/* 编辑礼物弹窗 */}
      <EditGiftDialog
        isOpen={editGiftDialogOpen}
        onClose={() => {
          setEditGiftDialogOpen(false);
          setSelectedGift(null);
        }}
        gift={selectedGift}
        onUpdate={async (id, data) => {
          await updateGift(id, data);
        }}
      />

      {/* 删除确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={deleteConfirmOpen}
        title="删除礼物"
        content={
          selectedGift
            ? `确定要删除礼物「${selectedGift.name}」吗？删除后孩子端不再显示，已兑换记录保留。`
            : ""
        }
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setSelectedGift(null);
        }}
      />

      {/* 确认兑换弹窗 */}
      <Dialog open={confirmRedemptionDialogOpen} onOpenChange={setConfirmRedemptionDialogOpen}>
        <DialogContent className="sm:max-w-[340px] max-h-[85vh] overflow-y-auto">
          <div className="text-center">
            {/* 图标 */}
            <div className="w-12 h-12 mx-auto mb-4 bg-[linear-gradient(135deg,#D1FAE5_0%,#A7F3D0_100%)] rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 stroke-[var(--color-success)]" />
            </div>

            {/* 标题 */}
            <div className="text-base text-[var(--text-primary)] font-semibold mb-5">
              确认兑换这个礼物？
            </div>

            {/* 详情 */}
            <div className="space-y-[10px] text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">孩子</span>
                <span className="text-[var(--text-primary)] font-medium flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {selectedRedemption?.username}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">礼物</span>
                <span className="text-[var(--text-primary)] font-medium flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" />
                  {selectedRedemption?.giftName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">积分</span>
                <span className="text-[var(--text-primary)] font-medium flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {selectedRedemption?.points}
                </span>
              </div>
            </div>

            {/* 提示 */}
            <div className="text-sm text-[var(--color-warning)] mt-2 mb-6">
              确认后不可撤销
            </div>

            {/* 按钮 */}
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmRedemptionDialogOpen(false)}
                className="flex-1 bg-white border border-[#E5E7EB] rounded-[8px] py-3 text-sm text-[var(--text-secondary)] cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleConfirmRedemptionAction}
                disabled={isConfirmingRedemption}
                className="flex-1 bg-[var(--color-success)] border-none rounded-[8px] py-3 text-sm text-white cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConfirmingRedemption ? "确认中..." : "确认兑换"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}