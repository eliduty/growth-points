import { z } from "zod";

/**
 * 用户名验证：2-20字符，仅中文、英文、数字
 */
export const usernameSchema = z
  .string()
  .min(2, "用户名至少2个字符")
  .max(20, "用户名最多20个字符")
  .regex(/^[一-龥a-zA-Z0-9]+$/, "用户名只能包含中文、英文、数字");

/**
 * 密码验证：6-32位
 */
export const passwordSchema = z
  .string()
  .min(6, "密码至少6位")
  .max(32, "密码最多32位");

/**
 * 注册表单 Schema
 */
export const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    role: z.enum(["PARENT", "CHILD"], "请选择角色"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

/**
 * 登录表单 Schema
 */
export const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
});

/**
 * 创建任务 Schema
 */
export const createTaskSchema = z.object({
  name: z.string().min(1, "请输入任务名称").max(50, "任务名称最多50字符"),
  points: z.number().int().min(1, "积分至少为1").max(100, "积分最多100"),
  description: z.string().max(200, "描述最多200字符").optional(),
  categoryId: z.string().min(1, "请选择类别"),
});

/**
 * 创建礼物 Schema
 */
export const createGiftSchema = z.object({
  name: z.string().min(1, "请输入礼物名称").max(50, "礼物名称最多50字符"),
  points: z.number().int().min(1, "积分至少为1").max(1000, "积分最多1000"),
  description: z.string().max(200, "描述最多200字符").optional(),
  weeklyLimit: z
    .number()
    .int()
    .min(1, "每周上限至少为1")
    .max(10, "每周上限最多10")
    .optional()
    .nullable(),
});

/**
 * 创建类别 Schema
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, "请输入类别名称").max(20, "类别名称最多20字符"),
});

/**
 * 兑换日设置 Schema
 */
export const exchangeDaysSchema = z.object({
  days: z.array(z.number().int().min(0).max(6)),
});

/**
 * 创建奖励 Schema
 */
export const createRewardSchema = z.object({
  userId: z.string().min(1, "请选择奖励对象"),
  points: z.number().int().min(1, "积分至少为1").max(1000, "积分最多1000"),
  reason: z.string().min(1, "请填写奖励原因").max(50, "原因最多50字符"),
});

/**
 * 从 Schema 推断类型
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type CreateGiftInput = z.infer<typeof createGiftSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type ExchangeDaysInput = z.infer<typeof exchangeDaysSchema>;
export type CreateRewardInput = z.infer<typeof createRewardSchema>;
