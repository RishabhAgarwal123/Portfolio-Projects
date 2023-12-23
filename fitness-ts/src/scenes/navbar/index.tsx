import { useState } from 'react';
import { Bars3ICon, XMarkIcon } from '@heroicons/react/24/solid';
import Logo from '@/assets/Logo.png';
import Link from './Link';

type Props = {
    selectedPage: String;
    setSelectedPage: (value: String) => void;
};

const index = ({ selectedPage, setSelectedPage }: Props) => {
    const flexBetween = 'flex items-center justify-between';

    return <nav>
        <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} w-full gap-16`}>
                    {/* Left side */}
                    <img alt='Logo' src={Logo} />
                    {/* Right side */}
                    <div className={`${flexBetween} w-full`}>
                        {/* Inner left */}
                        <div className={`${flexBetween} gap-8 text-sm`}>
                            <Link
                                page={'Home'}
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link page={'Benefit'}
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link page={'Our Classe'}
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link page={'Contact Us'}
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                        </div>
                        {/* Inner Right */}
                        <div className={`${flexBetween} gap-8`}>
                            <p>Sign In</p>
                            <button>Become a Member</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
}

export default index;