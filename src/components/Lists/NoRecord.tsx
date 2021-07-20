import { classNames } from "utils/functions";

function NoRecord({dataLength, loading}){
    // dataLenght -> length of data
    // loading -> check if is in loading

    return(

        <div className={classNames(
            dataLength > 0 || loading
                ? 'hidden'
                : 'text-lg bg-white px-6 py-4 w-full' 
            )}>
            <p className="text-gray-400">No Records </p>    
          </div>
    )
}


export default NoRecord;