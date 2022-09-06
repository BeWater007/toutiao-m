// 本地存数据
export const setItem = (k, v) => {
  // 如果值是对象，就进行json转换
  if (typeof v === 'object') {
    v = JSON.stringify(v)
  }
  localStorage.setItem(k, v)
}
// 本地取数据
export const getItem = (k) => {
  // 失败了直接从catch取
  try {
    return JSON.parse(localStorage.getItem(k))
  } catch (err) {
    return localStorage.getItem(k)
  }
}
// 删除数据
export const removeItem = k => {
  localStorage.removeItem(k)
}
