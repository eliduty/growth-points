'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Gift, Settings, Check, Star, Trash2, Calendar, ListTodo, Package, ChevronRight, LogOut, UserPlus, LogIn, Crown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Task {
  id: string
  name: string
  points: number
  description: string | null
  completedToday?: boolean
}

interface Gift {
  id: string
  name: string
  points: number
  description: string | null
  image: string | null
  available: boolean
}

interface User {
  id: string
  name: string
  role: 'PARENT' | 'CHILD'
  currentPoints: number
  totalPoints: number
}

interface Completion {
  id: string
  taskId: string
  taskName: string
  taskPoints: number
  completedAt: string
}

// 本周完成情况课表组件
interface WeeklyTimetableProps {
  completions: Completion[]
  tasks: Task[]
  isParent: boolean
  onRevoke?: (completionId: string, taskName: string, points: number) => void
}

const WeeklyTimetable = ({ completions, tasks, isParent, onRevoke }: WeeklyTimetableProps) => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  // 获取本周每一天的日期
  const getWeekDates = () => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    const monday = new Date(now)
    monday.setDate(diff)
    monday.setHours(0, 0, 0, 0)

    const dates: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates()

  // 检查某个任务在某天是否完成
  const isTaskCompletedOnDay = (taskId: string, date: Date) => {
    return completions.some(c => {
      const completionDate = new Date(c.completedAt)
      return c.taskId === taskId &&
        completionDate.getDate() === date.getDate() &&
        completionDate.getMonth() === date.getMonth() &&
        completionDate.getFullYear() === date.getFullYear()
    })
  }

  // 获取某天某个任务的完成记录
  const getCompletionForTaskOnDay = (taskId: string, date: Date) => {
    return completions.find(c => {
      const completionDate = new Date(c.completedAt)
      return c.taskId === taskId &&
        completionDate.getDate() === date.getDate() &&
        completionDate.getMonth() === date.getMonth() &&
        completionDate.getFullYear() === date.getFullYear()
    })
  }

  // 计算每天完成的任务数
  const getDailyCompletionsCount = (date: Date) => {
    return completions.filter(c => {
      const completionDate = new Date(c.completedAt)
      return completionDate.getDate() === date.getDate() &&
        completionDate.getMonth() === date.getMonth() &&
        completionDate.getFullYear() === date.getFullYear()
    }).length
  }

  // 计算每天获得的积分
  const getDailyPoints = (date: Date) => {
    return completions
      .filter(c => {
        const completionDate = new Date(c.completedAt)
        return completionDate.getDate() === date.getDate() &&
          completionDate.getMonth() === date.getMonth() &&
          completionDate.getFullYear() === date.getFullYear()
      })
      .reduce((sum, c) => sum + c.taskPoints, 0)
  }

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-200 bg-gray-50 p-3 text-left text-sm font-semibold text-gray-700 min-w-[120px]">
              任务
            </th>
            {days.map((day, index) => (
              <th key={day} className="border border-gray-200 bg-gray-50 p-3 text-center min-w-[70px]">
                <div className="text-sm font-semibold text-gray-700">{day}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {weekDates[index].getMonth() + 1}/{weekDates[index].getDate()}
                </div>
                <div className="mt-2 text-xs">
                  <span className="text-green-600 font-semibold">{getDailyPoints(weekDates[index])}</span>
                  <span className="text-gray-500">积分</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="border border-gray-200 p-3">
                <div className="text-sm font-medium text-gray-800">{task.name}</div>
                <div className="text-xs text-purple-600 mt-1">{task.points} 积分</div>
              </td>
              {weekDates.map((date, index) => {
                const completed = isTaskCompletedOnDay(task.id, date)
                const completion = getCompletionForTaskOnDay(task.id, date)
                return (
                  <td key={index} className="border border-gray-200 p-2 text-center">
                    {completed ? (
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600"
                          title={`完成于 ${new Date(completion!.completedAt).toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        {isParent && onRevoke && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onRevoke(completion!.id, completion!.taskName, completion!.taskPoints)}
                            title={`撤销"${completion!.taskName}"，扣除${completion!.taskPoints}积分`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 底部统计 */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="grid grid-cols-7 gap-2 text-center">
          {weekDates.map((date, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-gray-600">{days[index]}</div>
              <div className="text-lg font-bold text-green-600 mt-1">
                {getDailyCompletionsCount(date)}
              </div>
              <div className="text-xs text-gray-500">完成任务</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 创建一个带认证信息的 fetch 函数
const apiFetch = (url: string, options?: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
    },
  })
}

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('tasks')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [gifts, setGifts] = useState<Gift[]>([])
  const [redemptionDays, setRedemptionDays] = useState<number[]>([5])
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isRedemptionPeriod, setIsRedemptionPeriod] = useState(false)
  const [daysUntilNext, setDaysUntilNext] = useState(0)
  const [weeklyCompletions, setWeeklyCompletions] = useState<Completion[]>([])
  const [weeklyTotalPoints, setWeeklyTotalPoints] = useState(0)

  // 登录/注册对话框
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [loginStep, setLoginStep] = useState<'select-user' | 'enter-password'>('select-user')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [selectedUserInfo, setSelectedUserInfo] = useState<User | null>(null)
  const [newUserName, setNewUserName] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newUserRole, setNewUserRole] = useState<'PARENT' | 'CHILD'>('CHILD')

  // 任务管理对话框
  const [manageTasksOpen, setManageTasksOpen] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskPoints, setTaskPoints] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // 本周完成情况对话框
  const [weeklyDialogOpen, setWeeklyDialogOpen] = useState(false)

  // 礼物对话框
  const [giftDialogOpen, setGiftDialogOpen] = useState(false)
  const [giftName, setGiftName] = useState('')
  const [giftPoints, setGiftPoints] = useState('')
  const [giftDescription, setGiftDescription] = useState('')

  const getDayName = (day: number) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return days[day]
  }

  // 计算距离下一个兑换日的天数
  const calculateDaysUntilNext = (currentDay: number, redemptionDays: number[]) => {
    let daysUntilNext = 0
    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7
      if (redemptionDays.includes(nextDay)) {
        daysUntilNext = i
        break
      }
    }
    return daysUntilNext
  }

  // 加载兑换日设置
  const loadRedemptionDays = async () => {
    try {
      const res = await apiFetch('/api/settings/redemption-day')
      if (res.ok) {
        const data = await res.json()
        setRedemptionDays(data.selectedDays || [5])
      }
    } catch (error) {
      console.error('加载兑换日失败:', error)
    }
  }

  // 保存兑换日设置
  const saveRedemptionDays = async () => {
    try {
      const res = await apiFetch('/api/settings/redemption-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedDays: redemptionDays })
      })
      if (res.ok) {
        const data = await res.json()
        toast({
          title: '兑换日已保存',
          description: `每周 ${data.dayNames} 可以兑换`,
        })
      } else {
        toast({
          title: '保存失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '保存失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const loadData = async () => {
    try {
      const tasksRes = await apiFetch('/api/tasks')
      if (tasksRes.ok) {
        setTasks(await tasksRes.json())
      }

      const giftsRes = await apiFetch('/api/gifts')
      if (giftsRes.ok) {
        setGifts(await giftsRes.json())
      }

      // 加载兑换日设置
      await loadRedemptionDays()

      // 刷新当前用户信息（积分可能变化）
      if (currentUser) {
        const userRes = await apiFetch('/api/user')
        if (userRes.ok) {
          setCurrentUser(await userRes.json())
        }
      }

      // 加载本周完成记录
      await loadWeeklyCompletions()
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  }

  const loadWeeklyCompletions = async () => {
    try {
      const res = await apiFetch('/api/tasks/completions/weekly')
      if (res.ok) {
        const data = await res.json()
        setWeeklyCompletions(data.completions)
        setWeeklyTotalPoints(data.totalPoints)
      }
    } catch (error) {
      console.error('加载本周完成记录失败:', error)
    }
  }

  const checkLoginAndLoad = async () => {
    try {
      const userRes = await apiFetch('/api/user')
      if (userRes.ok) {
        const userData = await userRes.json()
        setCurrentUser(userData)
        await loadData()
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('检查登录状态失败:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectUser = (userId: string) => {
    const user = allUsers.find(u => u.id === userId)
    if (user) {
      setSelectedUserId(userId)
      setSelectedUserInfo(user)
      setLoginStep('enter-password')
    }
  }

  const handleBackToUserSelect = () => {
    setSelectedUserId('')
    setSelectedUserInfo(null)
    setLoginPassword('')
    setLoginStep('select-user')
  }

  const handleLogin = async () => {
    if (!selectedUserId) {
      toast({
        title: '请选择用户',
        variant: 'destructive',
      })
      return
    }

    if (!loginPassword.trim()) {
      toast({
        title: '请输入密码',
        variant: 'destructive',
      })
      return
    }

    try {
      const res = await apiFetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUserId, password: loginPassword })
      })

      if (res.ok) {
        const userData = await res.json()
        setCurrentUser(userData)
        setAuthDialogOpen(false)
        setLoginPassword('')
        setLoginStep('select-user')
        setSelectedUserId('')
        setSelectedUserInfo(null)
        await loadData()
        toast({
          title: '登录成功',
        })
      } else {
        const data = await res.json()
        toast({
          title: data.error || '登录失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '登录失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleRegister = async () => {
    if (!newUserName.trim()) {
      toast({
        title: '请输入用户名',
        variant: 'destructive',
      })
      return
    }

    if (!newUserPassword.trim()) {
      toast({
        title: '请输入密码',
        variant: 'destructive',
      })
      return
    }

    if (newUserPassword.length < 6) {
      toast({
        title: '密码长度至少为6位',
        variant: 'destructive',
      })
      return
    }

    const hasLetter = /[a-zA-Z]/.test(newUserPassword)
    const hasNumber = /[0-9]/.test(newUserPassword)
    if (!hasLetter || !hasNumber) {
      toast({
        title: '密码必须包含字母和数字',
        variant: 'destructive',
      })
      return
    }

    if (newUserPassword !== confirmPassword) {
      toast({
        title: '两次密码不一致',
        variant: 'destructive',
      })
      return
    }

    try {
      const res = await apiFetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          password: newUserPassword,
          role: newUserRole
        })
      })

      if (res.ok) {
        const userData = await res.json()
        setCurrentUser(userData)
        setAuthDialogOpen(false)
        setNewUserName('')
        setNewUserPassword('')
        setConfirmPassword('')
        await loadData()
        toast({
          title: '注册成功',
        })
      } else {
        const data = await res.json()
        toast({
          title: data.error || '注册失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '注册失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleLogout = async () => {
    try {
      await apiFetch('/api/user/logout', { method: 'POST' })
      setCurrentUser(null)
      setAuthDialogOpen(true)
      setAuthMode('login')
      setLoginStep('select-user')
      setSelectedUserId('')
      setSelectedUserInfo(null)
      setLoginPassword('')

      // 重新加载用户列表
      const usersRes = await apiFetch('/api/users')
      if (usersRes.ok) {
        setAllUsers(await usersRes.json())
      }

      toast({
        title: '已退出登录',
      })
    } catch (error) {
      toast({
        title: '登出失败',
        variant: 'destructive',
      })
    }
  }

  const handleCompleteTask = async (taskId: string, points: number) => {
    try {
      const res = await apiFetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId })
      })

      if (res.ok) {
        toast({
          title: '任务完成！',
          description: `获得 ${points} 积分`,
        })
        await loadData()
        setTasks(prev => prev.map(t =>
          t.id === taskId ? { ...t, completedToday: true } : t
        ))
      } else {
        const data = await res.json()
        toast({
          title: '完成任务失败',
          description: data.error || '未知错误',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '完成任务失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleAddTask = async () => {
    if (!taskName.trim() || !taskPoints.trim()) {
      toast({
        title: '请填写完整信息',
        description: '任务名称和积分都是必填项',
        variant: 'destructive',
      })
      return
    }

    try {
      const res = await apiFetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: taskName,
          points: parseInt(taskPoints),
          description: taskDescription || null
        })
      })

      if (res.ok) {
        const newTask = await res.json()
        setTasks(prev => [...prev, { ...newTask, completedToday: false }])
        setTaskDialogOpen(false)
        setTaskName('')
        setTaskPoints('')
        setTaskDescription('')
        toast({
          title: '任务添加成功',
        })
      } else {
        toast({
          title: '添加任务失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '添加任务失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await apiFetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setTasks(prev => prev.filter(t => t.id !== taskId))
        toast({
          title: '任务已删除',
        })
      } else {
        toast({
          title: '删除任务失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '删除任务失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleAddGift = async () => {
    if (!giftName.trim() || !giftPoints.trim()) {
      toast({
        title: '请填写完整信息',
        description: '礼物名称和所需积分都是必填项',
        variant: 'destructive',
      })
      return
    }

    try {
      const res = await apiFetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: giftName,
          points: parseInt(giftPoints),
          description: giftDescription || null
        })
      })

      if (res.ok) {
        const newGift = await res.json()
        setGifts(prev => [...prev, newGift])
        setGiftDialogOpen(false)
        setGiftName('')
        setGiftPoints('')
        setGiftDescription('')
        toast({
          title: '礼物添加成功',
        })
      } else {
        toast({
          title: '添加礼物失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '添加礼物失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleRedeemGift = async (giftId: string, points: number) => {
    if (!currentUser || currentUser.currentPoints < points) {
      toast({
        title: '积分不足',
        description: `还需要 ${points - (currentUser?.currentPoints || 0)} 积分`,
        variant: 'destructive',
      })
      return
    }

    try {
      const res = await apiFetch('/api/gifts/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId })
      })

      if (res.ok) {
        toast({
          title: '兑换成功！',
          description: `消耗 ${points} 积分`,
        })
        await loadData()
      } else {
        const data = await res.json()
        toast({
          title: '兑换失败',
          description: data.error || '未知错误',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '兑换失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteGift = async (giftId: string) => {
    try {
      const res = await apiFetch(`/api/gifts/${giftId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setGifts(prev => prev.filter(g => g.id !== giftId))
        toast({
          title: '礼物已删除',
        })
      } else {
        toast({
          title: '删除礼物失败',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '删除礼物失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const handleRevokeCompletion = async (completionId: string, taskName: string, points: number) => {
    try {
      const res = await apiFetch(`/api/tasks/completions/${completionId}/revoke`, {
        method: 'POST'
      })

      if (res.ok) {
        const data = await res.json()
        toast({
          title: '撤销成功',
          description: data.message,
        })
        await loadData()
      } else {
        const data = await res.json()
        toast({
          title: '撤销失败',
          description: data.error || '未知错误',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '撤销失败',
        description: '网络错误，请重试',
        variant: 'destructive',
      })
    }
  }

  const isParent = currentUser?.role === 'PARENT'

  // 获取今天的星期几
  const todayDayName = () => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return days[new Date().getDay()]
  }

  // 倒计时更新 useEffect
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const beijingOffset = 8 * 60 * 60 * 1000
      const beijingTime = new Date(now.getTime() + beijingOffset)
      const currentDay = beijingTime.getDay()
      const currentHour = beijingTime.getHours()
      const currentMinute = beijingTime.getMinutes()
      const currentSecond = beijingTime.getSeconds()
      const currentTotalSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond

      const isTodayRedemptionDay = redemptionDays.includes(currentDay)
      const inRedemptionPeriod = isTodayRedemptionDay && currentTotalSeconds >= 0 && currentTotalSeconds < 24 * 3600

      setIsRedemptionPeriod(inRedemptionPeriod)

      const daysUntil = calculateDaysUntilNext(currentDay, redemptionDays)
      setDaysUntilNext(daysUntil)

      if (inRedemptionPeriod) {
        // 倒计时到兑换日结束 (23:59:59)
        const endOfDaySeconds = 23 * 3600 + 59 * 60 + 59
        const remainingSeconds = endOfDaySeconds - currentTotalSeconds
        setCountdown({
          hours: Math.floor(remainingSeconds / 3600),
          minutes: Math.floor((remainingSeconds % 3600) / 60),
          seconds: remainingSeconds % 60
        })
      } else {
        // 倒计时到下一个兑换日
        const secondsUntilNext = daysUntil * 24 * 3600 - currentTotalSeconds
        setCountdown({
          hours: Math.floor(secondsUntilNext / 3600),
          minutes: Math.floor((secondsUntilNext % 3600) / 60),
          seconds: secondsUntilNext % 60
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [redemptionDays])

  // 检查登录状态并加载数据
  useEffect(() => {
    checkLoginAndLoad()
  }, [])

  // 加载中
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  // 未登录（正在重定向）
  if (!currentUser) {
    return null
  }

  // 已登录状态
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <main className="flex-1 pb-20">
        {/* 头部积分卡片 */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                {isParent ? (
                  <Crown className="w-5 h-5" />
                ) : (
                  <Star className="w-5 h-5" />
                )}
                {currentUser.name}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-white/30">
                  {isParent ? '家长' : '孩子'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-sm opacity-90">当前积分</p>
                    <p className="text-4xl font-bold">{currentUser.currentPoints}</p>
                  </div>
                  <div className="text-sm opacity-75 pb-1">
                    <p>累计获得: {currentUser.totalPoints}</p>
                    {!isParent && (
                      <div className="mt-2">
                        {isRedemptionPeriod ? (
                          <div>
                            <div className="text-green-200 text-sm font-medium">今天可兑换</div>
                            <div className="text-green-300 text-xs">
                              距离结束: {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-pink-200 text-sm font-medium">{daysUntilNext}天后兑换</div>
                            <div className="text-pink-300 text-xs">
                              剩余 {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Dialog open={weeklyDialogOpen} onOpenChange={setWeeklyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                      <Calendar className="w-4 h-4 mr-2" />
                      查看本周
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        本周完成情况
                      </DialogTitle>
                      <p className="text-sm text-gray-600">
                        本周共获得 <span className="font-bold text-green-600">{weeklyTotalPoints}</span> 积分，
                        完成 <span className="font-bold">{weeklyCompletions.length}</span> 个任务
                      </p>
                    </DialogHeader>
                    <div className="flex-1 overflow-auto mt-4">
                      <WeeklyTimetable
                        completions={weeklyCompletions}
                        tasks={tasks}
                        isParent={isParent}
                        onRevoke={handleRevokeCompletion}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主内容区域 */}
        <div className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* 任务列表 - 完成任务 */}
            <TabsContent value="tasks" className="mt-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-800">今日任务</h2>
                  <Badge variant="outline" className="text-sm">
                    {todayDayName()}
                  </Badge>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3 pb-4">
                  {tasks.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center text-gray-500">
                        <p>{isParent ? '还没有任务，请先在设置中添加任务' : '还没有任务'}</p>
                      </CardContent>
                    </Card>
                  ) : (
                    tasks.map((task) => (
                      <Card key={task.id} className={`${task.completedToday ? 'bg-gray-50' : 'bg-white'} hover:shadow-md transition-shadow`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-800">{task.name}</h3>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                  +{task.points} 积分
                                </Badge>
                              </div>
                              {task.description && (
                                <p className="text-sm text-gray-600">{task.description}</p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleCompleteTask(task.id, task.points)}
                              disabled={task.completedToday}
                              className={`min-w-[80px] ${
                                task.completedToday
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : 'bg-purple-600 hover:bg-purple-700'
                              }`}
                            >
                              {task.completedToday ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  已完成
                                </>
                              ) : (
                                '完成'
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* 礼物兑换 */}
            <TabsContent value="gifts" className="mt-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">礼物兑换</h2>
              </div>

              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-3 pb-4">
                  {gifts.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center text-gray-500">
                        <p>{isParent ? '还没有礼物，请先在设置中添加礼物' : '还没有礼物'}</p>
                      </CardContent>
                    </Card>
                  ) : (
                    gifts.map((gift) => (
                      <Card key={gift.id} className={`${!gift.available ? 'opacity-60' : 'bg-white'} hover:shadow-md transition-shadow`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-800">{gift.name}</h3>
                                <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                                  {gift.points} 积分
                                </Badge>
                              </div>
                              {gift.description && (
                                <p className="text-sm text-gray-600">{gift.description}</p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleRedeemGift(gift.id, gift.points)}
                              disabled={!gift.available || currentUser.currentPoints < gift.points}
                              className="min-w-[80px] bg-pink-600 hover:bg-pink-700 disabled:opacity-50"
                            >
                              兑换
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* 设置 - 仅家长可见 */}
            {isParent && (
              <TabsContent value="settings" className="mt-0">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">设置</h2>
                </div>

                <div className="space-y-4">
                  {/* 任务管理 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ListTodo className="w-5 h-5" />
                        任务管理
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">管理每日任务和对应积分</p>
                      <Dialog open={manageTasksOpen} onOpenChange={setManageTasksOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            管理任务
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                          <DialogHeader>
                            <DialogTitle>管理任务</DialogTitle>
                          </DialogHeader>
                          <div className="flex-1 overflow-hidden flex flex-col">
                            <div className="mb-4">
                              <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    添加新任务
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>添加新任务</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 pt-4">
                                    <div>
                                      <Label htmlFor="taskName">任务名称 *</Label>
                                      <Input
                                        id="taskName"
                                        placeholder="例如：完成作业"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="taskPoints">积分 *</Label>
                                      <Input
                                        id="taskPoints"
                                        type="number"
                                        placeholder="例如：10"
                                        value={taskPoints}
                                        onChange={(e) => setTaskPoints(e.target.value)}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="taskDescription">任务描述（可选）</Label>
                                      <Textarea
                                        id="taskDescription"
                                        placeholder="添加任务说明..."
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                      />
                                    </div>
                                    <Button onClick={handleAddTask} className="w-full bg-purple-600 hover:bg-purple-700">
                                      添加任务
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                            <ScrollArea className="flex-1">
                              <div className="space-y-2 pb-4">
                                {tasks.map((task) => (
                                  <Card key={task.id} className="bg-white">
                                    <CardContent className="p-3">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-800 text-sm">{task.name}</h3>
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                                              +{task.points}
                                            </Badge>
                                          </div>
                                          {task.description && (
                                            <p className="text-xs text-gray-600">{task.description}</p>
                                          )}
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleDeleteTask(task.id)}
                                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                                {tasks.length === 0 && (
                                  <div className="text-center text-gray-500 py-8 text-sm">
                                    还没有任务，点击上方按钮添加
                                  </div>
                                )}
                              </div>
                            </ScrollArea>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  {/* 礼物管理 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        礼物管理
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">管理可兑换的礼物和所需积分</p>
                      <div className="flex gap-2 mb-4">
                        <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
                              <Plus className="w-4 h-4 mr-2" />
                              添加新礼物
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>添加新礼物</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div>
                                <Label htmlFor="giftName">礼物名称 *</Label>
                                <Input
                                  id="giftName"
                                  placeholder="例如：玩游戏1小时"
                                  value={giftName}
                                  onChange={(e) => setGiftName(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="giftPoints">所需积分 *</Label>
                                <Input
                                  id="giftPoints"
                                  type="number"
                                  placeholder="例如：100"
                                  value={giftPoints}
                                  onChange={(e) => setGiftPoints(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="giftDescription">礼物描述（可选）</Label>
                                <Textarea
                                  id="giftDescription"
                                  placeholder="添加礼物说明..."
                                  value={giftDescription}
                                  onChange={(e) => setGiftDescription(e.target.value)}
                                />
                              </div>
                              <Button onClick={handleAddGift} className="w-full bg-pink-600 hover:bg-pink-700">
                                添加礼物
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2 pb-4">
                          {gifts.map((gift) => (
                            <Card key={gift.id} className="bg-white">
                              <CardContent className="p-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-gray-800 text-sm">{gift.name}</h3>
                                      <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-xs">
                                        {gift.points} 积分
                                      </Badge>
                                    </div>
                                    {gift.description && (
                                      <p className="text-xs text-gray-600">{gift.description}</p>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteGift(gift.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          {gifts.length === 0 && (
                            <div className="text-center text-gray-500 py-8 text-sm">
                              还没有礼物，点击上方按钮添加
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* 兑换日设置 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        兑换日设置
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">选择每周允许孩子兑换礼物的日期（可多选）</p>
                      <div className="grid grid-cols-7 gap-2">
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                          <Button
                            key={day}
                            variant={redemptionDays.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setRedemptionDays(prev =>
                                prev.includes(day)
                                  ? prev.filter(d => d !== day)
                                  : [...prev, day].sort((a, b) => a - b)
                              )
                            }}
                            className={redemptionDays.includes(day) ? "bg-pink-600 hover:bg-pink-700" : ""}
                          >
                            {getDayName(day)}
                          </Button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        当前设置：每周 <strong>
                          {redemptionDays.length > 0
                            ? redemptionDays.map(day => getDayName(day)).join('、')
                            : '未设置'}
                        </strong> 可兑换
                      </p>
                      <Button
                        onClick={saveRedemptionDays}
                        className="w-full bg-pink-500 hover:bg-pink-600"
                      >
                        保存兑换日设置
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 使用说明 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>使用说明</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                      <p>• 家长可以管理任务和礼物</p>
                      <p>• 孩子只能完成任务和兑换礼物</p>
                      <p>• 每个任务每天只能完成一次</p>
                      <p>• 完成任务后会立即获得积分</p>
                      <p>• 只能在设定的兑换日兑换礼物</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>

      {/* 底部导航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'tasks'
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Check className="w-6 h-6" />
            <span className="text-xs mt-1">任务</span>
          </button>
          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'gifts'
                ? 'text-pink-600 bg-pink-50'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <Gift className="w-6 h-6" />
            <span className="text-xs mt-1">礼物</span>
          </button>
          {isParent && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">设置</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center px-4 py-2 rounded-lg transition-colors text-gray-600 hover:text-red-600"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-xs mt-1">退出</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
