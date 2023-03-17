const Alert = ({alert}) => {
    console.log(alert);
    return (
      <div className={`${alert.error ? 'from-red-600 to-red-800' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}>
          {alert.msg}
      </div>
    )
  }
  
  export default Alert