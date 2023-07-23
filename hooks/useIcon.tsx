import { useState, useEffect } from 'react'
import table from '@/core/ICONS'
import { Icon } from '@iconify/react'

const useIcon = (icon: string) => {
  const iconQuery = icon.toLowerCase().replace(' ', '_')
  const [_icon, _setIcon] = useState<React.ReactElement>()

  useEffect(() => {
    _setIcon(
      table[iconQuery] ?? (
        <Icon icon="emojione:warning" width="24" height="24" />
      )
    )
  }, [iconQuery])

  return (
    <div className="tooltip capitalize" data-tip={icon}>
      {_icon}
    </div>
  )
}

export default useIcon
