"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Spinner } from "@nextui-org/react";
import { BackgroundGradient } from '@/components/gradients/background-gradient';
import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { signOut as nextAuthSignOut } from "next-auth/react";
import Cookies from 'js-cookie'
import { useClerk } from "@clerk/nextjs";

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

function Upsale() {
  const clerk = useClerk();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false); // State to track loading state

  const LoadingAnimation = () => (
    <div style={containerStyle}>
      <Spinner size="lg" color="secondary" />
    </div>
  );

  const apiUrl = "https://hook.us1.make.com/cbwgo5dvyfyvnbzc46mhwcb21qk9utpb";  // Replace with your actual API endpoint

  const handleActivateAccount = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          // Add more properties as needed
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to activate account: ${response.statusText}`);

      }
  // Sign the user out
  await nextAuthSignOut();
  await clerk.signOut();

  // Redirect to the login page
  window.location.href = '/login';

      // Handle the response accordingly
    } catch (error) {
      console.error('Error activating account:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ensure that the session and user ID exist before proceeding
    if (session && session.user && session.user.id) {
      // You can add logic here to check if the account is already activated or not
      // If not activated, you can show the activation button or perform automatic activation
    }
  }, [session]);

  return (
    <div>
      {session ? (
        <>
          <section className="flex flex-col lg:flex-row">
            <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
              <Wrapper>
                <div className="mx-auto flex max-w-sm flex-col justify-between">
                  <span className={`-mt-14 inline-block text-[64px] font-bold text-black dark:text-white`}>
                    01
                  </span>
                  <p className="pb-6 font-medium">
                    Features
                    me Instant posts build a Futuristic website Dashboard Authenticated page secure safe privacy
                  </p>
                  <li>
          <a href="/dashboard/marketing">/marketing</a>
        </li>
                  <CookieButton userKey="Admin" />
        <CookieButton userKey="Investor" />
                  <div className="">
                    <Button
                      size="lg"
                      className="w-full font-bold pb-1 dark:text-zinc-800 text-zinc-100"
                      variant="secondary"
                      onClick={handleActivateAccount}
                    >
                      {loading ? 'Activating account...' : 'Start free trial'}
                    </Button>
                  </div>
                </div>
              </Wrapper>
            </section>

            {/* second half */}

            <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-[#d6ebe9] p-9">
              <Image src="" alt="Man sitting in a wheelchair" />
            </section>
          </section>
        </>
      ) : (
        <div style={containerStyle}>
          <LoadingAnimation />
          <BackgroundGradient zIndex="-1" />
        </div>
      )}
    </div>
  );
}

function CookieButton({ userKey }: { userKey: string }) {
  'use client'

  const removeCookie = (name: string) => {
    Cookies.set('split-userkey', userKey)
    window.location.reload()
  }

  return (
    <button
      className="mr-2.5"
      onClick={() => removeCookie('split-userkey')}
    >
      Authenticate as {userKey} and reload page
    </button>
  )
}

export default Upsale;
