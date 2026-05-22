"use client";

import { useChildTasks } from "@/hooks/use-child-tasks";
import PointsOverview from "@/components/child/PointsOverview";
import TaskList from "@/components/child/TaskList";

export default function ChildPage() {
  const { taskData, isLoading, error, completeTask } = useChildTasks();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-16 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !taskData) {
    return (
      <div className="p-4 text-center text-gray-500">
        加载失败，请刷新页面
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      {/* 积分概览 */}
      <PointsOverview
        current={taskData.pointsOverview.current}
        total={taskData.pointsOverview.total}
        weekly={taskData.pointsOverview.weekly}
      />

      {/* 任务列表 */}
      <TaskList
        categories={taskData.categories}
        completedTasks={taskData.completedTasks}
        onComplete={completeTask}
      />
    </div>
  );
}
