// 主题配置（浅色默认值）
const lightOverrides = {
  common: {
    primaryColor: '#EE9028',
    primaryColorHover: '#f0a840',
    primaryColorPressed: '#d48020',
    primaryColorSuppl: '#EE9028',
    bodyColor: '#f7f8fa',
    baseColor: '#ffffff',
    cardColor: '#ffffff',
    modalColor: '#ffffff',
    popoverColor: '#ffffff',
    tableColor: '#fafbfc',
    borderColor: 'rgba(0, 0, 0, 0.05)',
    dividerColor: 'rgba(0, 0, 0, 0.05)',
  },
}

const darkOverrides = {
  common: {
    primaryColor: '#EE9028',
    primaryColorHover: '#f0a840',
    primaryColorPressed: '#d48020',
    primaryColorSuppl: '#EE9028',
    bodyColor: '#0d0d15',
    baseColor: '#0d0d15',
    cardColor: 'rgba(255,255,255,0.03)',
    modalColor: '#151520',
    popoverColor: '#151520',
    tableColor: 'rgba(255,255,255,0.02)',
    borderColor: 'rgba(255,255,255,0.06)',
    dividerColor: 'rgba(255,255,255,0.06)',
  },
}

export const overrides = { ...lightOverrides }

export { lightOverrides, darkOverrides }
