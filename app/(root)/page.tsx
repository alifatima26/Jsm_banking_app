import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async() => {

  //its hardcoded
    // const loggedIn = {
    //     firstName: 'Adrian',
    //     lastName: 'JSM',
    //     email: 'contact@jsmaster.pro'
    // };

    const loggedIn  = await getLoggedInUser()
  return (
    <section className='home'>
        
       <div className='home-content'>
        <header className='home-header'>
           <HeaderBox type="greeting" 
           title="Welcome," 
           user={loggedIn?.name || 'Guest'} 
           subtext="Access and manage your account and transactions efficiently." />
        
         {/**add another component TotalBalanceBox */}
         <TotalBalanceBox 
         accounts={[]} 
         totalBanks={1}
         totalCurrentBalance={1250.31}/>
        
        </header>

        RECENT TRANSACTIONS

        </div>
        
        <RightSidebar user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.45}, {currentBalance: 345.81}]}/>
        
        </section>
  )
}

export default Home