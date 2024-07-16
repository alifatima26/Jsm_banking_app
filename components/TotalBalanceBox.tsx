import { formatAmount } from '@/lib/utils'
import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({
    accounts=[], 
    totalBanks,
    totalCurrentBalance
}: TotalBalanceBoxProps) => {
  return (
    <section className='total-balance'>
        {/**act as wrapper for the chart */}
       <div className='total-balance-chart'>
        {/*Doughnut Chart */}
        <DoughnutChart accounts={accounts}/>
       </div>

{/**add class for add space  */}
     <div className='flex flex-col gap-6 custom-padding-md custom-padding-lg sm:block'>
            <h2 className='header-2'>
                Bank Accounts: {totalBanks}
            </h2>
        <div className='flex flex-col gap-2'>
            <p className='total-balance-label'>
                TotalCurrentBalance
            </p>
            {/**error if <p>have nested </p></p> */}
        <div className='total-balance-amount flex-center gap-2'>
            <AnimatedCounter amount = {totalCurrentBalance}/>
        </div>
        </div>
       </div>
        </section>
  )
}

export default TotalBalanceBox