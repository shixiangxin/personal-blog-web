export const iconClassMap = {
  home: 'icon-shouye',
  success: 'icon-70chenggong',
  error: 'icon-error',
  close: 'icon-close',
  warn: 'icon-warn',
  info: 'icon-info-circle',
  blog: 'icon-wenzhang',
  code: 'icon-code',
  about: 'icon-guanyuwomen',
  weixin: 'icon-weixin',
  mail: 'icon-youxiang',
  github: 'icon-github',
  qq: 'icon-QQ',
  arrowUp: 'icon-Up',
  arrowDown: 'icon-arrow-down-bold',
  empty: 'icon-wushuju',
  chat: 'icon-jurassic_message',
} as const

export type IconType = keyof typeof iconClassMap
