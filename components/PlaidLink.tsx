import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
          const data = await createLinkToken(user);// which is loggedIn
    
          setToken(data?.linkToken);
        }
    
        getLinkToken();
      }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        //allow us to link the bank account
        await exchangePublicToken({
          publicToken: public_token,
          user,
        })
    
        //to the home page
        router.push('/');
      }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
      }

      const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary">
          Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button className='plaidlink-ghost' onClick={() => open()} variant='ghost'>
          {/*  */}
          <Image 
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}/>
          <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
                   </Button>
      ): (
        <Button className='plaidlink-default' onClick={() => open()}>
            <Image 
              src="/icons/connect-bank.svg"
              alt="connect bank"
              width={24}
              height={24}/>
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
         Connect bank
        </Button>
      )}
    </>
  )
}

export default PlaidLink