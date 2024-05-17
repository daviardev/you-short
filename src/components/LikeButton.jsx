'use client'

import { useState } from 'react'

import { IoMdHeart } from 'react-icons/io'

export default function LikeButton () {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const HandleClick = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsActive(true)
      }, 0)
    }
  }
  return (
    <>
      <div>
        <button
          className={`button ${isActive ? 'is-active' : ''} ${isLoading ? 'is-loading' : ''}`}
          onClick={HandleClick}
        >
          {isLoading ? '' : <IoMdHeart size={40} />}
        </button>
      </div>

      <style jsx>{`
        .button {
            z-index: 1;
            margin: .5em;
            font-size: 1rem;
            padding: 6px;
            min-height: 2.4em;
            border-radius: 100%;
            outline: none;
            transition: all ease-in .1s;
          }
          .button:focus {
            color: white;
          }
          .button.is-active {
            z-index: 2;
            color: #D0516B;
            animation: .8s;
          }
          .button.is-active:before, .button.is-active:after {
            content: "";
            position: absolute;
            left: 12.7%;
            top: 42%;
            margin-left: -2px;
            margin-top: -2px;
            width: 6px;
            height: 6px;
            border-radius: 100%;
            transform: scale(0);
            color: #D0516B;
            border: 1px solid transparent;
            box-shadow: -.8em 0 0 -2px, .8em 0 0 -2px, 0 -.8em 0 -2px, 0 .8em 0 -2px, -.6em -.6em 0 -2px, -.6em .6em 0 -2px, 0.6em -.6em 0 -2px, .6em .6em 0 -2px;
          }
          .button.is-active:before {
            animation: effect-01-animation .8s cubic-bezier(.175, .885, .32, 1.275);
          }
          .button.is-active:after {
            animation: effect-02-animation .6s cubic-bezier(.175, .885, .32, 1.275);
          }
          @keyframes effect-01-animation {
            from {
              transform: rotate(-15deg) scale(0);
            }
            40% {
              opacity: 1;
            }
            to {
              transform: rotate(-30deg) scale(2.5);
              opacity: 0;
            }
          }
          @keyframes effect-02-animation {
            from {
              transform: rotate(10deg) scale(0);
            }
            40% {
              opacity: 1;
            }
            to {
              transform: rotate(30deg) scale(2);
              opacity: 0;
            }
          }
      `}
      </style>
    </>
  )
}
