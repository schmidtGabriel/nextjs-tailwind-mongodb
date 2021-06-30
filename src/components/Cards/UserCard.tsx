import {
    PhoneIcon,
    AtSymbolIcon,
  } from '@heroicons/react/outline'

export default function UserCard() {
    return (
        <div className="flex flex-row px-4 py-2 items-center">
      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
        <svg
          className="h-20 w-20 border border-gray-300 bg-white text-gray-300 rounded-full"
          preserveAspectRatio="none"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Gabriel Schmidt</h1>
        <div className="flex flex-row gap-4">
        <div className="flex flex-row content-center">
        <PhoneIcon
        className="text-black-400 h-5 w-5 mt-0.5"
        aria-hidden="true"
        />
        <span className="text-base"> 27 988088628 </span>
        </div>
        <div className="flex flex-row content-center items-stretch">
        <AtSymbolIcon
        className="text-black-400 h-5 w-5 mt-0.5"
        aria-hidden="true"
        />
        <span className="text-base">  g.avilasouza@gmail.com </span>
        </div>
        </div>
      </div>
    </div>
    )
  }