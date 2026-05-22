"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, AlertCircle, Gift, History } from "lucide-react";
import { useGifts } from "@/hooks/use-gifts";
import { GiftCard } from "@/components/parent/GiftCard";
import { RedemptionCard } from "@/components/parent/RedemptionCard";
import { AddGiftDialog } from "@/components/parent/AddGiftDialog";
import { EditGiftDialog } from "@/components/parent/EditGiftDialog";
import { BottomMenu, MenuItem } from "@/components/parent/BottomMenu";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface Gift {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
}

// 标签页类型
type TabType = "gifts" | "redemptions";
type RedemptionTabType = "pending" | "confirmed";

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

  // 标签页状态
  const [activeTab, setActiveTab] = useState<TabType>("gifts");
  const [redemptionTab, setRedemptionTab] = useState<RedemptionTabType>("pending");

  // 弹窗状态
  const [addGiftDialogOpen, setAddGiftDialogOpen] = useState(false);
  const [editGiftDialogOpen, setEditGiftDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 选中的礼物
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  // 底部菜单状态
  const [giftMenuOpen, setGiftMenuOpen] = useState(false);

  // 礼物长按处理
  const handleGiftLongPress = (gift: Gift) => {
    setSelectedGift(gift);
    setGiftMenuOpen(true);
  };

  // 礼物菜单项
  const giftMenuItems: MenuItem[] = [
    {
      label: "编辑礼物",
      onClick: () => {
        setEditGiftDialogOpen(true);
      },
    },
    {
      label: "删除礼物",
      destructive: true,
      onClick: () => {
        setDeleteConfirmOpen(true);
      },
    },
  ];

  // 确认删除礼物
  const handleConfirmDelete = async () => {
    if (selectedGift) {
      await deleteGift(selectedGift.id);
    }
    setDeleteConfirmOpen(false);
    setSelectedGift(null);
  };

  // 确认兑换
  const handleConfirmRedemption = async (id: string) => {
    await confirmRedemption(id);
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
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* 头部 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <h1 className="text-xl font-bold text-text">礼物管理</h1>
        {isFetching && (
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>刷新中...</span>
          </div>
        )}
      </motion.div>

      {/* 主标签页 */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === "gifts" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("gifts")}
        >
          <Gift className="w-4 h-4 mr-1" />
          礼物列表
        </Button>
        <Button
          variant={activeTab === "redemptions" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("redemptions")}
        >
          <History className="w-4 h-4 mr-1" />
          兑换记录
          {pendingRedemptions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
              {pendingRedemptions.length}
            </span>
          )}
        </Button>
      </div>

      {/* 礼物列表 */}
      {activeTab === "gifts" && (
        <>
          {gifts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Gift className="w-12 h-12 text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary mb-2">暂无礼物</p>
              <p className="text-text-secondary text-sm mb-4">
                添加孩子可以兑换的礼物
              </p>
              <Button onClick={() => setAddGiftDialogOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                添加礼物
              </Button>
            </motion.div>
          ) : (
            <>
              {/* 两列网格布局 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {gifts.map((gift, index) => (
                  <motion.div
                    key={gift.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GiftCard
                      gift={gift}
                      onLongPress={() => handleGiftLongPress(gift)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* 添加礼物按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <Button
                  onClick={() => setAddGiftDialogOpen(true)}
                  disabled={isCreatingGift}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  添加礼物
                </Button>
              </motion.div>
            </>
          )}
        </>
      )}

      {/* 兑换记录 */}
      {activeTab === "redemptions" && (
        <>
          {/* 二级标签页 */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={redemptionTab === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setRedemptionTab("pending")}
            >
              待确认
              {pendingRedemptions.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
                  {pendingRedemptions.length}
                </span>
              )}
            </Button>
            <Button
              variant={redemptionTab === "confirmed" ? "default" : "outline"}
              size="sm"
              onClick={() => setRedemptionTab("confirmed")}
            >
              已确认 ({confirmedRedemptions.length})
            </Button>
          </div>

          {/* 待确认列表 */}
          {redemptionTab === "pending" && (
            <>
              {pendingRedemptions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <History className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">暂无待确认的兑换申请</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {pendingRedemptions.map((redemption, index) => (
                    <motion.div
                      key={redemption.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <RedemptionCard
                        redemption={redemption}
                        onConfirm={handleConfirmRedemption}
                        onCancel={handleCancelRedemption}
                        isConfirming={isConfirmingRedemption}
                        isCancelling={isCancellingRedemption}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 已确认列表 */}
          {redemptionTab === "confirmed" && (
            <>
              {confirmedRedemptions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <History className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">暂无已确认的兑换记录</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {confirmedRedemptions.map((redemption, index) => (
                    <motion.div
                      key={redemption.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <RedemptionCard redemption={redemption} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* 底部菜单 */}
      <BottomMenu
        open={giftMenuOpen}
        onClose={() => {
          setGiftMenuOpen(false);
          setSelectedGift(null);
        }}
        title={selectedGift?.name || ""}
        subtitle={selectedGift ? `${selectedGift.points} 积分` : ""}
        items={giftMenuItems}
      />

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
        content={selectedGift ? `确定要删除礼物「${selectedGift.name}」吗？` : ""}
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setSelectedGift(null);
        }}
      />
    </div>
  );
}