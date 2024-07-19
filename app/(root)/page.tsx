import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async({searchParams: {id, page} }: SearchParamProps) => {

  //its hardcoded
    // const loggedIn = {
    //     firstName: 'Adrian',
    //     lastName: 'JSM',
    //     email: 'contact@jsmaster.pro'
    // };
    const currentPage = Number(page as string) || 1;

    const loggedIn  = await getLoggedInUser();
    //for getAccounts 
    const accounts = await getAccounts({
       userId: loggedIn.$id
    });

    if(!accounts) return;  //exit out of function


    const accountsData = accounts?.data;
    //now fetching the Id of that appwrite account
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    const account = await getAccount({appwriteItemId});

    // console.log({
    //   accountsData,
    //   account
    // })

  return (
    <section className='home'>
        
       <div className='home-content'>
        <header className='home-header'>
           <HeaderBox type="greeting" 
           title="Welcome," 
           user={loggedIn?.firstName || 'Guest'} 
           subtext="Access and manage your account and transactions efficiently." />
        
         {/**add another component TotalBalanceBox */}
         <TotalBalanceBox 
         accounts={accountsData} 
         totalBanks={accounts?. totalBanks}
         totalCurrentBalance={accounts?. totalCurrentBalance}/>
        
        </header>

        {/* RECENT TRANSACTIONS */}
        <RecentTransactions
        accounts={accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage}
        />
        

        </div>
        
        <RightSidebar user={loggedIn}
        transactions={accounts?. transactions}
        banks={accountsData?. slice(0, 2)}/>
        
        </section>
  )
}

export default Home