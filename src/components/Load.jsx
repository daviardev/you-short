export default function Loader () {
  return (
    <>
      <div className='loader'>
        <style jsx>{`
        .loader {
          width: 80px;
          position: absolute;
          left: 36%;
          top: 50%;
          height: 16px;
          display: flex;
          justify-content: space-between;
          animation: l3-0 2s infinite alternate;
        }

        .loader:before,
        .loader:after {
          content: "";
          width: 26px;
          height: 25px;
          background: #3FB8AF;
          animation: l3-1 .9s infinite alternate;
          border-radius: 100%;
          opacity: 80%;
        }

        .loader:after {
          background: #FF3D7F;
          --s:-1;
        }

        @keyframes l3-0 {
          0%, 40% {
            transform: rotate(0)
          }
          80%, 100% {
            transform: rotate(.5turn)
          }
        }

        @keyframes l3-1 {
          80%, 100% {
            transform: translate(calc(var(--s,1)*14px))
          }
        }
      `}
        </style>
      </div>
    </>
  )
}
