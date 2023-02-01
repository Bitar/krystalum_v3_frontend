import {FC, Suspense} from 'react'
import {WithChildren} from '../../_metronic/helpers'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import TopBarProgress from 'react-topbar-progress-indicator'

export const SuspenseView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 10,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}
