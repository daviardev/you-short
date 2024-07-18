export const Upload = props => (
  <svg
    width='43'
    height='28'
    viewBox='0 0 43 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_214_530)'>
      <path
        d='M7.5 12.8C7.5 8.32 7.5 6.08 8.372 4.368C9.13898 2.86277 10.3628 1.63898 11.868 0.872C13.58 -2.38419e-07 15.82 0 20.3 0H30.2C34.68 0 36.92 -2.38419e-07 38.632 0.872C40.1372 1.63898 41.361 2.86277 42.128 4.368C43 6.08 43 8.32 43 12.8V15.2C43 19.68 43 21.92 42.128 23.632C41.361 25.1372 40.1372 26.361 38.632 27.128C36.921 28 34.68 28 30.2 28H20.3C15.82 28 13.58 28 11.868 27.128C10.3628 26.361 9.13898 25.1372 8.372 23.632C7.5 21.92 7.5 19.68 7.5 15.2V12.8Z'
        fill='#FA2D6C'
      />
      <path
        d='M0 12.8C0 8.32 -2.38419e-07 6.08 0.872 4.368C1.63898 2.86277 2.86277 1.63898 4.368 0.872C6.08 -2.38419e-07 8.32 0 12.8 0H22.7C27.18 0 29.42 -2.38419e-07 31.132 0.872C32.6372 1.63898 33.861 2.86277 34.628 4.368C35.5 6.079 35.5 8.32 35.5 12.8V15.2C35.5 19.68 35.5 21.92 34.628 23.632C33.861 25.1372 32.6372 26.361 31.132 27.128C29.421 28 27.18 28 22.7 28H12.8C8.32 28 6.08 28 4.368 27.128C2.86277 26.361 1.63898 25.1372 0.872 23.632C-2.38419e-07 21.92 0 19.68 0 15.2V12.8Z'
        fill='#20D5EC'
      />
      <path
        d='M31.5 0H11.5C7.08172 0 3.5 3.58172 3.5 8V20C3.5 24.4183 7.08172 28 11.5 28H31.5C35.9183 28 39.5 24.4183 39.5 20V8C39.5 3.58172 35.9183 0 31.5 0Z'
        fill='#161823'
      />
      <path
        d='M20.5 7.75C20.3674 7.75 20.2402 7.80268 20.1464 7.89645C20.0527 7.99021 20 8.11739 20 8.25V13H15.25C15.1174 13 14.9902 13.0527 14.8964 13.1464C14.8027 13.2402 14.75 13.3674 14.75 13.5V15C14.75 15.1326 14.8027 15.2598 14.8964 15.3536C14.9902 15.4473 15.1174 15.5 15.25 15.5H20V20.25C20 20.3826 20.0527 20.5098 20.1464 20.6036C20.2402 20.6973 20.3674 20.75 20.5 20.75H22C22.1326 20.75 22.2598 20.6973 22.3536 20.6036C22.4473 20.5098 22.5 20.3826 22.5 20.25V15.5H27.25C27.3826 15.5 27.5098 15.4473 27.6036 15.3536C27.6973 15.2598 27.75 15.1326 27.75 15V13.5C27.75 13.3674 27.6973 13.2402 27.6036 13.1464C27.5098 13.0527 27.3826 13 27.25 13H22.5V8.25C22.5 8.11739 22.4473 7.99021 22.3536 7.89645C22.2598 7.80268 22.1326 7.75 22 7.75H20.5Z'
        fill='#fff'
      />
    </g>
    <defs>
      <clipPath id='clip0_214_530'>
        <rect width='43' height='28' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

export const Delete = props => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 48 48'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M4 24a4 4 0 118 0 4 4 0 01-8 0zm16 0a4 4 0 118 0 4 4 0 01-8 0zm16 0a4 4 0 118 0 4 4 0 01-8 0z' />
    </svg>
  )
}

export const Flag = props => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 48 48'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M4 24a4 4 0 118 0 4 4 0 01-8 0zm16 0a4 4 0 118 0 4 4 0 01-8 0zm16 0a4 4 0 118 0 4 4 0 01-8 0z' />
    </svg>
  )
}

export const NotFound = props => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={90}
      height={90}
      fill='rgba(128, 130, 133, 1)'
      viewBox='0 0 72 72'
      {...props}
    >
      <path
        fillRule='evenodd'
        d='M33.853 13.661c-2.799-.686-4.884-3.218-4.884-6.224a6.417 6.417 0 0 1 6.408-6.408 6.417 6.417 0 0 1 6.408 6.408c0 3.006-2.084 5.538-4.883 6.224V24.5h18.177c4.675 0 8.481 3.806 8.481 8.481v29.51c-.005 4.674-3.806 8.48-8.486 8.48H15.68c-4.675 0-8.481-3.806-8.481-8.48V32.98c0-4.675 3.806-8.481 8.481-8.481h18.172V13.661Zm1.525-9.583a3.366 3.366 0 0 0-3.36 3.359 3.363 3.363 0 0 0 3.36 3.359 3.363 3.363 0 0 0 3.359-3.36 3.363 3.363 0 0 0-3.36-3.358ZM15.68 27.548a5.438 5.438 0 0 0-5.432 5.432v29.509a5.438 5.438 0 0 0 5.432 5.432H55.08a5.438 5.438 0 0 0 5.432-5.432v-29.51a5.438 5.438 0 0 0-5.432-5.431H15.68Zm7.007 16.939a1.526 1.526 0 0 0 3.049 0v-4.635c0-.843-.68-1.524-1.524-1.524s-1.525.68-1.525 1.524v4.635Zm24.047 14.7c-.432 0-.859-.182-1.164-.538A13.372 13.372 0 0 0 35.5 53.93a1.517 1.517 0 0 1-.117.004 13.354 13.354 0 0 0-10.2 4.721c-.304.35-.731.534-1.163.534a1.523 1.523 0 0 1-1.159-2.51 16.401 16.401 0 0 1 12.38-5.793c.043-.004.087-.006.132-.006 4.827 0 9.39 2.114 12.52 5.793.544.64.468 1.606-.172 2.15a1.485 1.485 0 0 1-.986.366Zm-.193-13.176a1.522 1.522 0 0 1-1.525-1.525v-4.634c0-.843.681-1.524 1.525-1.524.843 0 1.524.68 1.524 1.524v4.635c0 .838-.68 1.524-1.524 1.524Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export const Dots = props => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='currentColor'
      viewBox='0 0 48 48'
      {...props}
    >
      <path
        fillRule='evenodd'
        d='M4 24a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm16 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm16 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export const Heart = props => (
  <svg
    width={40}
    height={40}
    viewBox='8 8 40 40'
    fill='none'
    {...props}
  >
    <path fillRule='evenodd' clipRule='evenodd' d='M20.5 11.75C25.5 11.75 28 15.0833 28 15.0833C28 15.0833 30.5 11.75 35.5 11.75C41.3333 11.75 45.5 16.3333 45.5 22.1667C45.5 28.8333 40.0518 34.7762 35.0833 39.25C32.0159 42.012 29.6667 43.8333 28 43.8333C26.3333 43.8333 23.9175 41.9982 20.9167 39.25C16.0325 34.7771 10.5 28.8333 10.5 22.1667C10.5 16.3333 14.6667 11.75 20.5 11.75Z' />
  </svg>
)

export const Comment = props => (
  <svg
    width={40}
    height={40}
    viewBox='0 0 48 48'
    fill='none'
    {...props}
  >
    <g opacity={0.9} filter='url(#a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M38.494 35.313C42.6 31.2 45 26.916 45 21.928 45 11.806 35.733 3.6 24.3 3.6S3.6 11.806 3.6 21.928C3.6 32.051 13.167 39 24.6 39v3.357c0 1.063 1.103 1.748 2.038 1.241 2.922-1.583 8.336-4.759 11.856-8.285Zm-24.25-15.857c1.635 0 2.96 1.315 2.96 2.935a2.948 2.948 0 0 1-2.96 2.938 2.947 2.947 0 0 1-2.955-2.938c0-1.62 1.324-2.935 2.956-2.935Zm13.013 2.935c0-1.62-1.324-2.935-2.957-2.935-1.633 0-2.957 1.315-2.957 2.935A2.947 2.947 0 0 0 24.3 25.33a2.947 2.947 0 0 0 2.957-2.938Zm7.098-2.935a2.945 2.945 0 0 1 2.956 2.935 2.946 2.946 0 0 1-2.956 2.938 2.948 2.948 0 0 1-2.958-2.938c0-1.62 1.324-2.935 2.958-2.935Z'
        fill='#fff'
      />
    </g>
    <path
      opacity={0.1}
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24.6 39s11.467-.886 16.26-7.024c-4.793 6.752-9.586 10.434-13.78 11.662C22.886 44.865 24.6 39 24.6 39Z'
      fill='url(#b)'
    />
    <defs>
      <linearGradient
        id='b'
        x1={20.41}
        y1={37.67}
        x2={22.308}
        y2={43.633}
        gradientUnits='userSpaceOnUse'
      >
        <stop />
        <stop offset={1} stopOpacity={0.01} />
      </linearGradient>
      <filter
        id='a'
        x={1.2}
        y={2.4}
        width={46.2}
        height={44.969}
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={1.2} />
        <feGaussianBlur stdDeviation={1.2} />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
        <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
        <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
      </filter>
    </defs>
  </svg>
)

export const Share = props => (
  <svg
    width={40}
    height={40}
    viewBox='0 0 48 48'
    fill='none'
    {...props}
  >
    <g opacity={0.9} filter='url(#a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M25.8 10.309c0-1.267 1.516-1.916 2.433-1.043l13.952 13.286a2.88 2.88 0 0 1-.093 4.256L28.187 38.94c-.932.813-2.387.152-2.387-1.085v-5.498s-14.93-2.69-19.72 6.101c-.446.82-2.187 1.107-1.833-2.983C5.727 27.95 8.75 16.2 25.8 16.2v-5.891Z'
        fill='#fff'
      />
    </g>
    <path
      opacity={0.03}
      fillRule='evenodd'
      clipRule='evenodd'
      d='m36.096 16.8 2.768 5.536a2.4 2.4 0 0 1-.572 2.885L25.896 36s-.6 3 1.2 3c1.8 0 16.2-13.2 16.2-13.2s.6-1.8-1.2-3.6c-1.8-1.8-6-5.4-6-5.4Z'
      fill='#161823'
    />
    <path
      opacity={0}
      fillRule='evenodd'
      clipRule='evenodd'
      d='M25.8 16.839v15.6s-14.289-2.014-18.764 4.8c-4.306 6.556-3.91-7.404 2.572-14.356S25.8 16.839 25.8 16.839Z'
      fill='#fff'
    />
    <defs>
      <radialGradient
        id='b'
        cx={0}
        cy={0}
        r={1}
        gradientUnits='userSpaceOnUse'
        gradientTransform='rotate(-113.046 27.23 12.569) scale(19.0955 18.771)'
      >
        <stop />
        <stop offset={0.995} stopOpacity={0.01} />
        <stop offset={1} stopOpacity={0.01} />
      </radialGradient>
      <filter
        id='a'
        x={1.8}
        y={7.666}
        width={43.679}
        height={35.233}
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={1.2} />
        <feGaussianBlur stdDeviation={1.2} />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0' />
        <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
        <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
      </filter>
    </defs>
  </svg>
)
