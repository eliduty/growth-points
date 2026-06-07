/**
 * EdgeOne Pages 人机校验兼容的 fetch 封装
 *
 * EdgeOne Pages 默认开启人机校验（eo_token/eo_time cookie），
 * 当 cookie 过期时，API 请求会被 307 重定向到验证页（返回 HTML），
 * 导致 JSON 解析失败。
 *
 * 此封装检测响应是否为 EdgeOne 验证页，如果是则自动刷新页面
 * 让浏览器重新完成人机验证。
 */

type FetchOptions = RequestInit & {
  /** 是否在检测到人机校验时自动刷新页面，默认 true */
  autoRefreshOnChallenge?: boolean;
};

/** 检测响应是否为 EdgeOne 人机校验页 */
function isEdgeOneChallenge(response: Response): boolean {
  // EdgeOne 人机校验页返回 HTML 且状态码为 307 或 401
  const contentType = response.headers.get("content-type") || "";
  const isHtml = contentType.includes("text/html");
  // fetch 跟随重定向后 type 为 "opaqueredirect" 或 status 为 200 但内容是 HTML
  // 也可能是 401 + HTML（如 X-EOP-MSG 头）
  const hasEopHeader = response.headers.get("X-EOP-MSG") !== null;
  return isHtml || hasEopHeader;
}

/**
 * 兼容 EdgeOne 人机校验的 fetch
 *
 * 用法与原生 fetch 完全一致，额外处理了 EdgeOne 人机校验重定向。
 */
export async function edgeFetch(
  input: RequestInfo | URL,
  init?: FetchOptions
): Promise<Response> {
  const { autoRefreshOnChallenge = true, ...fetchInit } = init || {};

  const response = await fetch(input, fetchInit);

  // 检测是否被 EdgeOne 人机校验拦截
  if (autoRefreshOnChallenge && isEdgeOneChallenge(response)) {
    // 刷新页面让浏览器重新完成人机验证
    if (typeof window !== "undefined") {
      window.location.reload();
      // 返回一个永远不会 resolve 的 promise，阻止后续代码执行
      return new Promise<Response>(() => {});
    }
  }

  return response;
}
