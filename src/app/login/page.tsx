'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Crown, User, Sparkles, Star, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface User {
  id: string
  name: string
  role: 'PARENT' | 'CHILD'
  currentPoints: number
  totalPoints: number
}

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [loginStep, setLoginStep] = useState<'select-user' | 'enter-password'>('select-user')
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [selectedUserInfo, setSelectedUserInfo] = useState<User | null>(null)
  const [newUserName, setNewUserName] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newUserRole, setNewUserRole] = useState<'PARENT' | 'CHILD'>('CHILD')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loadUsers = async () => {
      try {
        const res = await fetch('/api/users')
        if (res.ok) {
          setAllUsers(await res.json())
        }
      } catch (error) {
        console.error('加载用户列表失败:', error)
      }
    }
    loadUsers()
  }, [])

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

    setIsLoading(true)
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUserId, password: loginPassword })
      })

      if (res.ok) {
        toast({
          title: '登录成功',
          description: '欢迎回来！',
        })
        router.push('/')
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
    } finally {
      setIsLoading(false)
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

    setIsLoading(true)
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          password: newUserPassword,
          role: newUserRole
        })
      })

      if (res.ok) {
        toast({
          title: '注册成功',
          description: '欢迎加入！',
        })
        router.push('/')
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
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              家庭积分
            </h1>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 0.5 }}
            >
              <Star className="w-8 h-8 text-pink-600" />
            </motion.div>
          </div>
          <p className="text-gray-600 text-lg">激励成长，记录美好</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {authMode === 'login' ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {allUsers.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8 space-y-6"
                      >
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <User className="w-10 h-10 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">还没有用户</h3>
                          <p className="text-gray-600">请先注册一个账号开始使用</p>
                        </div>
                        <Button
                          onClick={() => setAuthMode('register')}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                        >
                          <Crown className="w-5 h-5 mr-2" />
                          立即注册
                        </Button>
                      </motion.div>
                    ) : loginStep === 'select-user' ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">选择用户</h2>
                          <p className="text-gray-600">点击您的账号进行登录</p>
                        </div>
                        <div className="space-y-3">
                          {allUsers.map((user, index) => (
                            <motion.div
                              key={user.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card
                                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 border-transparent hover:border-purple-200"
                                onClick={() => handleSelectUser(user.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                      user.role === 'PARENT'
                                        ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                                        : 'bg-gradient-to-br from-pink-400 to-pink-600'
                                    }`}>
                                      {user.role === 'PARENT' ? (
                                        <Crown className="w-6 h-6 text-white" />
                                      ) : (
                                        <User className="w-6 h-6 text-white" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                                      <p className="text-sm text-gray-600">
                                        {user.role === 'PARENT' ? '👑 家长' : '⭐ 孩子'}
                                      </p>
                                    </div>
                                    <div className="text-gray-400">
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                        <div className="pt-4 text-center">
                          <Button
                            variant="ghost"
                            onClick={() => setAuthMode('register')}
                            className="text-gray-600 hover:text-purple-600"
                          >
                            还没有账号？去注册
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <Button
                          variant="ghost"
                          onClick={handleBackToUserSelect}
                          className="mb-4 text-gray-600 hover:text-purple-600"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          返回选择用户
                        </Button>

                        <div className="text-center mb-6">
                          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                            selectedUserInfo?.role === 'PARENT'
                              ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                              : 'bg-gradient-to-br from-pink-400 to-pink-600'
                          }`}>
                            {selectedUserInfo?.role === 'PARENT' ? (
                              <Crown className="w-10 h-10 text-white" />
                            ) : (
                              <User className="w-10 h-10 text-white" />
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">{selectedUserInfo?.name}</h3>
                          <p className="text-gray-600 mt-1">
                            {selectedUserInfo?.role === 'PARENT' ? '👑 家长' : '⭐ 孩子'}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="loginPassword" className="text-gray-700 font-medium">密码</Label>
                            <Input
                              id="loginPassword"
                              type="password"
                              placeholder="请输入密码"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                              className="mt-2 h-12 text-lg border-2 focus:border-purple-400"
                              autoFocus
                            />
                          </div>
                          <Button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                          >
                            {isLoading ? '登录中...' : '登录'}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">注册新用户</h2>
                      <p className="text-gray-600">创建账号开始使用</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="userName" className="text-gray-700 font-medium">用户名</Label>
                        <Input
                          id="userName"
                          placeholder="请输入用户名"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          className="mt-2 h-12 text-lg border-2 focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="newPassword" className="text-gray-700 font-medium">密码</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="至少6位，需包含字母和数字"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          className="mt-2 h-12 text-lg border-2 focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">确认密码</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="请再次输入密码"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="mt-2 h-12 text-lg border-2 focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">身份</Label>
                        <div className="flex gap-3 mt-2">
                          <Button
                            type="button"
                            variant={newUserRole === 'PARENT' ? 'default' : 'outline'}
                            onClick={() => setNewUserRole('PARENT')}
                            className={`flex-1 h-14 text-lg ${
                              newUserRole === 'PARENT'
                                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                                : 'border-2 hover:border-purple-300'
                            }`}
                          >
                            <Crown className="w-5 h-5 mr-2" />
                            家长
                          </Button>
                          <Button
                            type="button"
                            variant={newUserRole === 'CHILD' ? 'default' : 'outline'}
                            onClick={() => setNewUserRole('CHILD')}
                            className={`flex-1 h-14 text-lg ${
                              newUserRole === 'CHILD'
                                ? 'bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white'
                                : 'border-2 hover:border-pink-300'
                            }`}
                          >
                            <User className="w-5 h-5 mr-2" />
                            孩子
                          </Button>
                        </div>
                      </div>

                      <Button
                        onClick={handleRegister}
                        disabled={isLoading}
                        className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                      >
                        {isLoading ? '注册中...' : '注册'}
                      </Button>
                    </div>

                    <div className="pt-2 text-center">
                      <Button
                        variant="ghost"
                        onClick={() => setAuthMode('login')}
                        className="text-gray-600 hover:text-purple-600"
                      >
                        已有账号？去登录
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-gray-600 text-sm"
        >
          <p>通过积分激励，让成长更有趣 ✨</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
